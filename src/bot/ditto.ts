import type { Chess, Move } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";
import { shuffleArray } from "@hugoalh/shuffle-array";
import { nameToIndex, SquareIndex } from "./helpers.ts";

/** Make a move that is as similar as possible to opponents latest move */
export class Ditto extends Player {
  name = "Ditto";
  best = (moves: Moves, game: Chess) => {
    const journal: Move[] = game.history({ verbose: true });

    // Pick random if first mover
    if (journal.length === 0) {
      return Math.floor(Math.random() * moves.length);
    }

    // Previuos move
    const prev: Move = journal[journal.length - 1];
    const from: SquareIndex = nameToIndex(prev.from);
    const to: SquareIndex = nameToIndex(prev.to);

    // Score each legal move; [index, improvement]
    const scores: [number, number][] = moves.map((
      move,
      index,
    ) => {
      const moveFrom: SquareIndex = nameToIndex(move.from);
      const moveTo: SquareIndex = nameToIndex(move.to);

      const rankFromDelta = from[0] - (7 - moveFrom[0]);
      const fileFromDelta = from[1] - moveFrom[1];
      const rankToDelta = to[0] - (7 - moveTo[0]);
      const fileToDelta = to[1] - moveTo[1];

      // Sum of square deltas
      const distance = rankFromDelta ** 2 + fileFromDelta ** 2 +
        rankToDelta ** 2 + fileToDelta ** 2;

      return [index, distance];
    });

    const sorted = shuffleArray(scores).sort((a, b) => a[1] - b[1]);
    // console.log({ sorted });
    const nearest = sorted[0];
    const index = nearest[0];

    return index;
  };
}
