// Rules of chess

// File and Rank are 0 indexed
type Index = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type File = Index;
export type Rank = Index;
export type Square = { readonly file: File; readonly rank: Rank };
export type Vector = { readonly file: number; readonly rank: number };

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
  readonly name: string;
  // UTF8 char to display on ansi terminal
  readonly symbol: Symbol;
  // Which color is piece
  readonly color: Color;
  // Value of piece
  readonly value: number;
  // Valid moves
  readonly movements: Movements;
  // Step movement or runner over contigues sqares
  readonly slide: boolean;
};

export const BlackKing: Piece = {
  name: "king",
  // symbol: "♔",
  symbol: "♚",
  color: "black",
  value: 0,
  movements: [
    { file: -1, rank: -1 },
    { file: -1, rank: 0 },
    { file: -1, rank: 1 },
    { file: 0, rank: -1 },
    { file: 0, rank: 1 },
    { file: 1, rank: -1 },
    { file: 1, rank: 0 },
    { file: 1, rank: 1 },
  ],
  slide: false,
};

export const WhiteKing: Piece = Object.assign({}, BlackKing, {
  color: "white",
});

export const BlackRook: Piece = {
  name: "rook",
  symbol: "♜",
  color: "black",
  value: 9,
  movements: [
    { file: -1, rank: 0 },
    { file: 0, rank: -1 },
    { file: 1, rank: 0 },
    { file: 0, rank: 1 },
  ],
  slide: true,
};

export const WhiteRook: Piece = Object.assign({}, BlackRook, {
  color: "white",
});
