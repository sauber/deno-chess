import type { Board } from "./board.ts";
import { type Move, validMoves } from "./moves.ts";
import type { Color, Piece } from "./rules.ts";
import type { Square } from "./square.ts";

/** Perform a move as a player */
export class Player {
  constructor(private readonly color: Color, private readonly board: Board) {}

  /** Scan all the pieces on the board having color of player.
   * Compile list of all valid moves.
   * Pick best move.
   * Move piece on board.
   */
  public move(): Move {
    // Find pieces on squares
    const squares: Square[] = this.board.pieces(this.color);

    // List of all possible moves for player
    const moves: Move[] = [];
    for (const square of squares) {
      if (square.piece) {
        moves.push(...validMoves(square.piece, square, this.board));
      }
    }

    // Pick best, random for now, move
    const bestMove = moves[Math.floor(Math.random() * moves.length)];

    // Debug move
    console.log("Best Move:", bestMove[0].name, "->", bestMove[1].name);

    // Update board
    this.board.move(bestMove[0], bestMove[1]);

    // Inform best move
    return bestMove;
  }
}
