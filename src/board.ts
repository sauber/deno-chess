import { King } from "./king.ts";
import { type File, type Rank, Square } from "./square.ts";

type Grid = Square[][];

/** A chess board of squares */
export class Board {
  private readonly grid: Grid;

  constructor() {
    this.grid = Board.makegrid();
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
