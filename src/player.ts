import type { Chess, Color, Move, PieceSymbol, Square } from "chess.js";
import type { Moves } from "./types.ts";

/** Index of squares from chess.board() output
 * Row 0 = rank 8
 * Row 1 = rank 7
 * ...
 */
export type RankIndex = number;
export type FileIndex = number;
export type Index = [RankIndex, FileIndex];
export type Indices = Index[];

// Output from chess.board() method
type SquarePiece = { square: Square; type: PieceSymbol; color: Color };
type Board = (SquarePiece | null)[][];

/** Convert square name, such as a1, n8 etc. to Index */
export function nameToIndex(square: string): Index {
  const [file, rank] = square.split("");
  const fileIndex: FileIndex = file.charCodeAt(0) - 97;
  const rankIndex: RankIndex = 8 - parseInt(rank, 10);
  return [rankIndex, fileIndex];
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

export abstract class Player {
  // Name of player
  public abstract readonly name: string;

  // Most recent move
  public last: Move | undefined;

  /** Identify next move */
  public move(moves: Moves, game: Chess): number {
    const index: number = this.best(moves, game);
    this.last = moves[index];

    // TODO: Identify and record captured pieces

    return index;
  }

  /** Decide index of best move */
  public abstract best(moves: Moves, game: Chess): number;
}
