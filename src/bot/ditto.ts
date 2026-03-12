import type { Chess, Move } from "chess.js";
import { Player } from "../player.ts";
import { nameToIndex, type SquareIndex } from "./helpers.ts";

/** Make a move that is as similar as possible to opponents latest move */
export class Ditto extends Player {
  name = "Ditto";
  rank = (move: Move, game: Chess, opponent: Player): number => {
    // Random if first move
    if (game.moveNumber() === 1) return Math.random();

    // Previous move by opponent
    const prev: Move = opponent.last as Move;
    const from: SquareIndex = nameToIndex(prev.from);
    const to: SquareIndex = nameToIndex(prev.to);

    const moveFrom: SquareIndex = nameToIndex(move.from);
    const moveTo: SquareIndex = nameToIndex(move.to);

    const rankFromDelta = from[0] - (7 - moveFrom[0]);
    const fileFromDelta = from[1] - moveFrom[1];
    const rankToDelta = to[0] - (7 - moveTo[0]);
    const fileToDelta = to[1] - moveTo[1];

    // Sum of square deltas
    const distance = rankFromDelta ** 2 + fileFromDelta ** 2 +
      rankToDelta ** 2 + fileToDelta ** 2;

    // The more different move is, the worse the score
    return -distance;
  };
}
