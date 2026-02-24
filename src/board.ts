import { type File, type Rank, Square } from "./square.ts";
import type { Vector } from "./rules.ts";

type Grid = Square[][];

/** A chess board of squares */
export class Board {
  private readonly grid: Grid;

  constructor() {
    this.grid = Board.makegrid();
  }

  /** Get square at position */
  public get(file: File, rank: Rank): Square {
    return this.grid[rank - 1][file.charCodeAt(0) - "a".charCodeAt(0)];
  }

  /** Render the board as a string for display on an ansi terminal */
  toString(): string {
    let str = "";
    for (let i = 7; i >= 0; i--) {
      str += `${i + 1} `;
      for (const square of this.grid[i]) {
        const piece = square.piece ? square.piece.symbol : " ";
        const bg = square.color === "white" ? "\x1b[47m" : "\x1b[44m";
        const fg = square.color === "white" ? "\x1b[30m" : "\x1b[37m";
        str += `${bg}${fg} ${piece} \x1b[0m`;
      }
      str += "\n";
    }
    str += "   a  b  c  d  e  f  g  h \n";
    return str;
  }

  /**
   * Returns the Square at an offset vector from a given Square.
   * Or returns undefined if the offset is outside of board limits.
   * @param square The starting square.
   * @param offset The vector to offset by, in the format `[rank, file]`.
   * @returns The target Square or undefined.
   */
  target(square: Square, offset: Vector): Square | undefined {
    const newRank = square.rank + offset[0];
    const newFileCharCode = square.file.charCodeAt(0) + offset[1];

    if (
      newRank < 1 || newRank > 8 ||
      newFileCharCode < "a".charCodeAt(0) ||
      newFileCharCode > "h".charCodeAt(0)
    ) {
      return undefined;
    }

    const fileIndex = newFileCharCode - "a".charCodeAt(0);
    return this.grid[newRank - 1][fileIndex];
  }

  /** Create an 8 by 8 empty board */
  static makegrid(): Grid {
    const grid: Grid = [];
    // Loop rank 1 to 8
    for (let rank = 1; rank <= 8; rank++) {
      const row: Square[] = [];
      // Loop file a to h
      for (let file = 1; file <= 8; file++) {
        // Create square with RankFile name
        const square = new Square(
          rank as Rank,
          String.fromCharCode(96 + file) as File,
        );
        // Add square to row
        row.push(square);
      }
      // Add row to grid
      grid.push(row);
    }
    return grid;
  }
}
