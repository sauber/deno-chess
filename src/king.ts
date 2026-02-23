import type { Name, Piece, Symbol } from "./piece.ts";
import type { Color } from "./types.ts";

export class King implements Piece {
  public readonly name: Name = "king";
  public symbol: Symbol;

  constructor(public readonly color: Color) {
    this.symbol = color == "white" ? "♔" : "♚";
  }
}
