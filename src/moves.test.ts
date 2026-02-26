import { Board } from "./board.ts";
import { type Moves, pieceMoves } from "./moves.ts";
import { Pieces } from "./pieces.ts";
import { BlackKing, type Square, WhiteKing } from "./rules.ts";
import { assertEquals } from "@std/assert";

Deno.test("Bottom Right", () => {
  const board = new Board(
    new Pieces([{ file: 0, rank: 0, piece: WhiteKing }]),
    new Pieces([{ file: 7, rank: 7, piece: BlackKing }]),
  );
  const square: Square = { file: 0, rank: 0 };
  const moves: Moves = pieceMoves(WhiteKing, square, board);
  assertEquals(moves.length, 3);
});

Deno.test("Center", () => {
  const board = new Board(
    new Pieces([{ file: 1, rank: 1, piece: WhiteKing }]),
    new Pieces([{ file: 7, rank: 7, piece: BlackKing }]),
  );
  const square: Square = { file: 1, rank: 1 };
  const moves: Moves = pieceMoves(WhiteKing, square, board);
  assertEquals(moves.length, 8);
});
