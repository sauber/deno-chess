// Various help functions to help players analyze board

import type { Chess, Color, Piece, PieceSymbol, Square } from "chess.js";

/** Index of squares from chess.board() output
 * Row 0 = rank 8
 * Row 1 = rank 7
 * ...
 */
export type RankIndex = number;
export type FileIndex = number;
export type SquareIndex = [RankIndex, FileIndex];
export type Indices = SquareIndex[];

// Output from chess.board() method
type SquarePiece = { square: Square; type: PieceSymbol; color: Color };
type Board = (SquarePiece | null)[][];

/** Convert square name, such as a1, n8 etc. to Index */
export function nameToIndex(square: Square): SquareIndex {
  const [file, rank] = square.split("");
  const fileIndex: FileIndex = file.charCodeAt(0) - 97;
  const rankIndex: RankIndex = 8 - parseInt(rank, 10);
  return [rankIndex, fileIndex];
}

/** Convert board Index to square name  */
export function indexToName(index: SquareIndex): Square {
  const [RankIndex, FileIndex] = index;
  const rank = 8 - RankIndex;
  const file = String.fromCharCode(97 + FileIndex);
  return file + rank as Square;
}

/** Square indeces of pieces of matching color */
export function pieces(color: Color, game: Chess): Indices {
  // Scan board for pieces of matching color
  const board: Board = game.board();
  const squares: Indices = [];
  for (let rank = 0; rank < board.length; rank++) {
    for (let file = 0; file < board[rank].length; file++) {
      const square: SquarePiece | null = board[rank][file];
      if (square?.color === color) squares.push([rank, file]);
    }
  }
  return squares;
}

/** Geometric distance between two squares */
export function distance(p1: SquareIndex, p2: SquareIndex): number {
  return Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);
}

/** Given an Index on board, what is distance to nearest opponent */
export function distanceToNearest(from: SquareIndex, other: Indices): number {
  const distances: number[] = other.map((square: SquareIndex) =>
    distance(from, square)
  );
  const sorted = distances.sort((a, b) => a - b);
  const shortest = sorted[0];
  return shortest;
}

/** Value of pieces */
export const pieceValue: Record<PieceSymbol, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 1000,
};
