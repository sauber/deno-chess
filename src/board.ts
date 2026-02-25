import { type File, type Rank, Square } from "./square.ts";
import type { Color, Piece, Vector } from "./rules.ts";
import type { Move } from "./moves.ts";

type Grid = Square[][];

/** A chess board of squares */
export class Board {
  private readonly grid: Grid;
  private latest: Move | undefined;

  constructor(grid?: Grid, latest?: Move) {
    this.grid = grid ?? Board.makegrid();
    this.latest = latest;
  }

  /** Get square at position */
  public square(file: File, rank: Rank): Square {
    return this.grid[rank - 1][file.charCodeAt(0) - "a".charCodeAt(0)];
  }

  /** List of all square having a piece of matching color */
  public pieces(color: Color): Square[] {
    const squares: Square[] = [];
    for (const row of this.grid) {
      for (const square of row) {
        if (square.piece && square.piece.color === color) squares.push(square);
      }
    }
    return squares;
  }

  /** Render the board as a string for display on an ansi terminal */
  toString(): string {
    let str = "";
    for (let i = 7; i >= 0; i--) {
      str += `${i + 1} `;
      for (const square of this.grid[i]) {
        const piece = square.piece ? square.piece.symbol : " ";
        const isLatest = this.latest &&
          (this.latest[0] === square || this.latest[1] === square);
        let bg;
        if (isLatest) {
          // Accented colors for the latest move
          bg = square.color === "white"
            ? "\x1b[48;5;228m" // Light Yellow
            : "\x1b[48;5;130m"; // Dark Orange
        } else {
          bg = square.color === "white" ? "\x1b[48;5;230m" : "\x1b[48;5;94m";
        }
        const fg = square.piece?.color === "white" ? "\x1b[30m" : "\x1b[37m";
        // const fg = "";
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

  /**
   * Places a piece on a square, returning a new Board.
   * This is useful for setting up a board.
   */
  public place(piece: Piece, file: File, rank: Rank): Board {
    const newGrid = this.grid.map((row) => row.slice());
    const newSquare = new Square(rank, file, piece);

    newGrid[rank - 1][file.charCodeAt(0) - "a".charCodeAt(0)] = newSquare;

    return new Board(newGrid, this.latest);
  }

  /**
   * Move a piece from one square to another. Returns a new board with the move applied.
   * Piece on target square may be captured and removed from the board.
   */
  public move(source: Square, target: Square): Board {
    const newGrid = this.grid.map((row) => row.slice());

    const newSource = new Square(source.rank, source.file, undefined);
    const newTarget = new Square(target.rank, target.file, source.piece);

    newGrid[source.rank - 1][source.file.charCodeAt(0) - "a".charCodeAt(0)] =
      newSource;
    newGrid[target.rank - 1][target.file.charCodeAt(0) - "a".charCodeAt(0)] =
      newTarget;

    const newLatest: Move = [newSource, newTarget];

    return new Board(newGrid, newLatest);
  }
}
