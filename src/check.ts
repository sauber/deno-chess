import type { Board } from "./board.ts";
import type { Color } from "./rules.ts";

/** Check if a color is currently in check */
export function isCheck(color: Color, board: Board): boolean {
  // Find the king's square
  const kingSquare = board.pieces(color).find((s) => s.piece?.name === "king");
  if (!kingSquare) return false;

  // Check if any opponent piece can move to the king's square
  const opponentColor: Color = color === "white" ? "black" : "white";
  const opponentSquares = board.pieces(opponentColor);

  for (const square of opponentSquares) {
    if (!square.piece) continue;

    // We use a simplified move check to avoid infinite recursion
    for (const vector of square.piece.movements) {
      if (square.piece.slide) {
        let current = square;
        while (true) {
          const target = board.target(current, vector);
          if (!target) break;
          if (target === kingSquare) return true;
          if (target.piece) break;
          current = target;
        }
      } else {
        const target = board.target(square, vector);
        if (target === kingSquare) return true;
      }
    }
  }
  return false;
}
