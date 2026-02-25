import { assertEquals } from "@std/assert";
import { Board } from "./board.ts";
import { BlackKing, WhiteKing } from "./rules.ts";
import type { Square } from "./square.ts";

Deno.test("Instance", () => {
  const board = new Board();
  console.log(board.toString());
});

Deno.test("Square", () => {
  const board = new Board();
  const square: Square = board.square("a", 1);
  console.log(square.toString());
});

Deno.test("Pieces", () => {
  const board = new Board();

  // Place a white piece on black square and white square
  board.square("a", 1).piece = WhiteKing;
  board.square("h", 1).piece = WhiteKing;

  const squares = board.pieces("white");
  assertEquals(squares.length, 2);
  assertEquals(squares[0].piece?.name, "king");

  // Place a black piece on black square and white square
  board.square("a", 8).piece = BlackKing;
  board.square("h", 8).piece = BlackKing;

  console.log(board.toString());
});
