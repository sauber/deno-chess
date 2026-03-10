import type { Chess, Move } from "chess.js";
import { Player } from "../player.ts";
import { distance, nameToIndex, pieceValue, SquareIndex } from "./helpers.ts";

/** Play decent chess taking opportunities and avoiding mistakes */
export class Decent extends Player {
  name = "Decent";
  rank = (move: Move, game: Chess): number => {
    let score = 0;

    // --- Evaluation that requires making the move ---
    game.move(move);

    // Is our piece at risk after the move?
    const opponent = game.turn();
    const attackers = game.attackers(move.to, opponent);
    const riskValue = attackers.length > 0 ? pieceValue[move.piece] : 0;

    // Does the move result in a check or checkmate?
    if (game.isCheckmate()) {
      score += 1000; // A win is the highest priority.
    } else if (game.isCheck()) {
      score += 0.5; // Checks are forcing and generally good.
    }

    game.undo();
    // --- End of move-dependent evaluation ---

    // What's the material gain from this move?
    const captureValue = move.captured ? pieceValue[move.captured] : 0;
    score += captureValue - riskValue;

    // Is it a promotion?
    if (move.promotion) {
      score += pieceValue[move.promotion];
    }

    // Does the move improve our position by controlling the center?
    const center: SquareIndex = [3.5, 3.5];
    const distBefore = distance(center, nameToIndex(move.from));
    const distAfter = distance(center, nameToIndex(move.to));
    score += (distBefore - distAfter) * 0.1; // Small bonus for moving towards the center.

    return score;
  };
}
