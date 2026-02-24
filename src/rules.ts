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
  // Valid moves
  movements: Movements;
  // Step movement or runner over contigues sqares
  recursive: boolean;
};

export const BlackKing: Piece = {
  name: "king",
  symbol: "♔",
  color: "black",
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
  recursive: false,
};

export const WhiteKing: Piece = {
  name: "king",
  symbol: "♚",
  color: "white",
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
  recursive: false,
};
