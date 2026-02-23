import type { Color } from "./types.ts";

/** Valid piece names */
export type Name = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";

/** Valid Unicode symbols for pieces */
export type Symbol =
  | "♔"
  | "♕"
  | "♖"
  | "♗"
  | "♘"
  | "♙"
  | "♚"
  | "♛"
  | "♜"
  | "♝"
  | "♞"
  | "♟";

/** Base class for chess pieces */
export abstract class Piece {
  abstract name: Name;
  abstract color: Color;
  abstract symbol: Symbol;

  public toString(): string {
    return this.symbol;
  }
}
