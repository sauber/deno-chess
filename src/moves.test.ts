import { Board } from "./board.ts";
import { type Moves, pieceMoves } from "./moves.ts";
import { type Piece, WhiteKing } from "./rules.ts";
import { assertEquals } from "@std/assert";

Deno.test("Bottom Right", () => {
  const board = new Board();
  const newBoard = board.place(WhiteKing, "a", 1);
  const square = newBoard.square("a", 1);
  const moves: Moves = pieceMoves(WhiteKing, square, newBoard);
  assertEquals(moves.length, 3);
});

Deno.test("Center", () => {
  const board = new Board();
  const newBoard = board.place(WhiteKing, "d", 4);
  const square = newBoard.square("d", 4);
  const moves: Moves = pieceMoves(WhiteKing, square, newBoard);
  assertEquals(moves.length, 8);
});
