import { type Move, PAWN } from "chess.js";
import { Player } from "../player.ts";
import { pieceValue, type RankIndex } from "./helpers.ts";

/** Move pawns forward to obtain promotion */
export class Promotion extends Player {
  name = "Promotion";
  rank = (move: Move): number => {
    // Capture Value
    const captureValue = move.captured ? pieceValue[move.captured] : 0;

    // No pawn, no promotion, but capture is better thank an aimless move
    // TODO: Forward distance is better
    if (move.piece !== PAWN) return captureValue;

    // Promotion Value
    const promotionValue: number = move.promotion
      ? pieceValue[move.promotion]
      : 0;

    // Immediate promotion
    if (move.promotion) return captureValue + promotionValue;

    // Source and Target rank of move
    const source: RankIndex = 8 - parseInt(move.from[1], 10);
    const target: RankIndex = 8 - parseInt(move.to[1], 10);

    // Improvement of distance + value of capture
    const improvement: number = (7 - source) / (7 - target);
    return improvement + captureValue;
  };
}
