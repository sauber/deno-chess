// import { createSquare, type File, type Rank, type Square } from "./square.ts";
import type { File, Piece, Rank, Square, Vector } from "./rules.ts";
import type { Move } from "./moves.ts";
import type { Pieces } from "./pieces.ts";
import { log } from "node:console";

// 2D array of squares
// type Grid = Square[][];

// A position on the board
// export type Square = {
//   readonly rank: Rank;
//   readonly file: File;
// };

// Collection of squares
// type Set = Square[];

/** A chess board of squares */
export class Board {
  constructor(
    public readonly white: Pieces,
    public readonly black: Pieces,
    public readonly latest?: Move,
  ) {
  }

  /** Create an 8 by 8 empty board */
  // static makegrid(): Grid {
  //   const grid: Grid = [];
  //   // Loop rank
  //   for (let rank = 0; rank <= 7; rank++) {
  //     const row: Set = [];
  //     // Loop file
  //     for (let file = 0; file <= 7; file++) {
  //       // Add square to row
  //       const square: Square = { rank: rank as Rank, file: file as File };
  //       row.push(square);
  //     }
  //     // Add row to grid
  //     grid.push(row);
  //   }
  //   return grid;
  // }

  // Initialize a board with a set of piece
  // static load(set: Set): Board {
  //   const grid: Grid = Board.makegrid();
  //   for (const square of set) {
  //     grid[square.rank][square.file] = square;
  //   }
  //   return new Board(grid);
  // }

  /** Get piece at position */
  // public square(file: Index, rank: Index): Square {
  //   return this.grid[rank][file];
  // }

  /** List of all square having a piece of matching color */
  // public pieces(color: Color): Set {
  //   const set: Set = [];
  //   for (const row of this.grid) {
  //     for (const square of row) {
  //       if (square.piece && square.piece.color === color) set.push(square);
  //     }
  //   }
  //   return set;
  // }

  /**
   * Returns the Square at an offset vector from a given Square.
   * Or returns undefined if the offset is outside of board limits.
   * @param square The starting square.
   * @param offset The vector to offset by, in the format `[rank, file]`.
   * @returns The target Square or undefined.
   */
  target(square: Square, offset: Vector): Square | undefined {
    const file = square.file + offset.file;
    if (file < 0 || file > 7) return undefined;

    const rank = square.rank + offset.rank;
    if (rank < 0 || rank > 7) return undefined;

    return { file: file as File, rank: rank as Rank };
  }

  /**
   * Move a piece from one square to another. Returns a new board with the move applied.
   * Piece on target square may be captured and removed from the board.
   */
  public move(move: Move): Board {
    const { source, target } = move;
    const piece: Piece = source.piece;

    const [set, other] = piece.color === "white"
      ? [this.white, this.black]
      : [this.black, this.white];

    // Capture piece in other set
    const newOther = other.piece(target) ? other.capture(target) : other;

    // Move piece in set
    // console.log(
    //   `Board move source (${source.file}, ${source.rank}) -> (${target.file}, ${target.rank})`,
    // );
    // console.log(
    //   "Set:",
    //   set.all.map((p) => `${p.piece.name} ${p.file}, ${p.rank}`),
    // );
    const newSet = set.move(source, target);
    // Compare location of pieces in set and newSet
    // console.log(
    //   "Set:",
    //   set.all.map((p) => `${p.piece.name} ${p.file}, ${p.rank}`),
    // );
    // console.log(
    //   "newSet:",
    //   newSet.all.map((p) => `${p.piece.name} ${p.file}, ${p.rank}`),
    // );

    const [white, black] = piece.color === "white"
      ? [newSet, newOther]
      : [newOther, newSet];

    // console.warn("First board move");

    return new Board(white, black, move);
  }

  /** Which piece, if any is on square */
  public piece(square: Square): Piece | undefined {
    return this.white.piece(square) || this.black.piece(square);
  }
}
