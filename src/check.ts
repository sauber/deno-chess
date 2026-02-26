import type { Board } from "./board.ts";
import type { Pieces, Position } from "./pieces.ts";
import type { Color, Piece, Square } from "./rules.ts";

/** Check if a color is currently in check */
export function isCheck(color: Color, board: Board): boolean {
  // Find the king's square
  const kingSquare: Position = color === "white"
    ? board.white.king
    : board.black.king;

  // Check if any opponent piece can move to the king's square
  // const opponentColor: Color = color === "white" ? "black" : "white";
  const opponentPieces: Pieces = color === "white" ? board.black : board.white;

  for (const position of opponentPieces.all) {
    // if (!square.piece) continue;
    const piece: Piece = position.piece;
    const square: Square = { file: position.file, rank: position.rank };

    // We use a simplified move check to avoid infinite recursion
    for (const vector of piece.movements) {
      if (piece.slide) {
        let current: Square = square;
        while (true) {
          const target = board.target(current, vector);
          // Target square is not on board
          if (!target) break;
          // Our king is on target square
          if (
            target.file === kingSquare.file && target.rank === kingSquare.rank
          ) return true;
          // Some other piece is on target square
          if (board.piece(target)) break;

          current = target;
        }
      } else {
        const target = board.target(square, vector);
        if (!target) break;
        if (
          target.file === kingSquare.file && target.rank === kingSquare.rank
        ) return true;
      }
    }
  }
  return false;
}
