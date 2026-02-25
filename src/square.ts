import type { Color, Piece } from "./rules.ts";

/** List of valid names of squares from a1 to h8 */
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type File = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
// export type SquareName = `${File}${Rank}`;

/** A single square on a chess board */
export class Square {
  /** Option piece on the square */
  public readonly piece?: Piece;
  public readonly color: Color;
  public readonly name: string;

  constructor(
    public readonly rank: Rank,
    public readonly file: File,
    piece?: Piece,
  ) {
    this.color = Square.getColor(rank, file);
    this.name = `${this.file}${this.rank}`;
    this.piece = piece;
  }

  /** Decide color of square based on name */
  static getColor(rank: Rank, file: File): Color {
    if (file === "a" || file === "c" || file === "e" || file === "g") {
      return rank % 2 === 0 ? "white" : "black";
    } else {
      return rank % 2 === 0 ? "black" : "white";
    }
  }
}
