import type { Chess, Move } from "chess.js";
import { Player } from "../player.ts";
import { nameToIndex, pieceValue } from "./helpers.ts";

/** This bot would focus on controlling as much of the board as possible,
 * advancing its pawns to gain space and restrict the opponent's pieces.
 */
export class Space extends Player {
  name = "Space";
  rank = (move: Move, game: Chess): number => {
    let score = 0;

    // 1. Pawn advancement. The further a pawn is, the more space it controls.
    if (move.piece === "p") {
      const toRank = nameToIndex(move.to)[0];
      if (game.turn() === "w") {
        // White's pawns move from rank index 6 towards 0.
        // A pawn on rank 5 (index 3) is better than on rank 2 (index 6).
        // We give a bonus based on how far the pawn is up the board.
        score += (6 - toRank) * 0.5;
      } else {
        // Black's pawns move from rank index 1 towards 7.
        // A pawn on rank 4 (index 4) is better than on rank 7 (index 1).
        score += (toRank - 1) * 0.5;
      }
    }

    // 2. Capturing is a good way to gain an advantage.
    if (move.captured) {
      score += pieceValue[move.captured];
    }

    // 3. Restrict opponent's movement.
    game.move(move);
    const opponentMoves = game.moves().length;
    score -= opponentMoves * 0.1; // The more moves opponent has, the worse.
    game.undo();

    return score;
  };
}
