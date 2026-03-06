import { type Chess, PAWN } from "chess.js";
import { Player } from "../player.ts";
import type { Moves } from "../types.ts";
import { pieceValue, type RankIndex } from "./helpers.ts";
import shuffleArray from "@hugoalh/shuffle-array";

/** Move pawns forward to obtain promotion */
export class Promotion extends Player {
  name = "Promotion";
  best = (moves: Moves, _chess: Chess) => {
    // [index, improvement]
    const scores: [number, number][] = moves.map((move, index) => {
      // Capture Value
      const captureValue = move.captured ? pieceValue[move.captured] : 0;

      // No pawn, no promotion, but capture is ok too
      if (move.piece !== PAWN) return [index, captureValue];

      // Immediate promotion and capture a piece while at it
      const promotionValue: number = move.promotion
        ? pieceValue[move.promotion]
        : 0;

      // Immediate promotion
      if (move.promotion) return [index, captureValue + promotionValue];

      // Source and Target rank of move
      const source: RankIndex = 8 - parseInt(move.from[1], 10);
      const target: RankIndex = 8 - parseInt(move.to[1], 10);

      // Improvement of distance
      const improvement: number = (7 - source) / (7 - target);
      return [index, improvement + captureValue];
    });

    // Index of Move with createst relative improvement
    const sorted = shuffleArray(scores).sort((a, b) => b[1] - a[1]);
    const nearest = sorted[0];
    const index = nearest[0];

    return index;
  };
}
