import { Board } from "./board.ts";
import { type Moves, validMoves } from "./moves.ts";
import { type Piece, WhiteKing } from "./rules.ts";
import { assertEquals } from "@std/assert";

Deno.test("Bottom Right", () => {
  const board = new Board();
  const king: Piece = WhiteKing;
  const square = board.get("a", 1);
  square.piece = king;
  const moves: Moves = validMoves(king, square, board);
  assertEquals(moves.length, 3);
});

Deno.test("Center", () => {
  const board = new Board();
  const king: Piece = WhiteKing;
  const square = board.get("d", 4);
  square.piece = king;
  const moves: Moves = validMoves(king, square, board);
  assertEquals(moves.length, 8);
});
