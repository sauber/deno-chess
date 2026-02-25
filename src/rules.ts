// Rules of chess

export type Vector = [number, number];
export type Movements = Vector[];
export type Name = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";
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
export type Color = "white" | "black";

export type Piece = {
  // Name of piece
  name: string;
  // UTF8 char to display on ansi terminal
  symbol: Symbol;
  // Which color is piece
  color: Color;
  // Value of piece
  value: number;
  // Valid moves
  movements: Movements;
  // Step movement or runner over contigues sqares
  slide: boolean;
};

export const BlackKing: Piece = {
  name: "king",
  // symbol: "♔",
  symbol: "♚",
  color: "black",
  value: 0,
  movements: [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ],
  slide: false,
};

export const WhiteKing: Piece = Object.assign({}, BlackKing, {
  color: "white",
  symbol: "♚",
});
