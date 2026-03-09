import { BLACK, type Chess, type Color, WHITE } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";
import shuffleArray from "@hugoalh/shuffle-array";
import { indexToName, pieces, type SquareIndex } from "./helpers.ts";

/** Make sure own pieces is protected by other own pieces */
export class Cover extends Player {
  name = "Cover";
  best = (moves: Moves, game: Chess) => {
    const [me, opponent]: [Color, Color] = game.turn() === "w"
      ? [WHITE, BLACK]
      : [BLACK, WHITE];

    // [index, score]
    const scores: [number, number][] = moves.map((
      move,
      index,
    ) => {
      // Algorithm
      // - Simulate a move
      // - For each own piece add how many are defending it (attacked by own color)
      // - For each own piece subtract how many are attacking it (attacked by opponent color)
      // - Record score
      // - Roll back move

      game.move(move);
      let score = 0;
      const ownPieces = pieces(me, game);
      ownPieces.forEach((piece: SquareIndex) => {
        const defenders = game.attackers(indexToName(piece), me);
        // const attackers = game.attackers(indexToName(piece), opponent);
        score += defenders.length;
        // score -= attackers.length;
      });

      game.undo();
      return [index, score];
    });

    const sorted: [number, number][] = shuffleArray(scores).sort((a, b) =>
      b[1] - a[1]
    );
    // console.log({ sorted });
    const best = sorted[0];
    const moveIndex = best[0];

    return moveIndex;
  };
}
