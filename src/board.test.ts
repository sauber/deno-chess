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

  // Place white pieces
  const boardWithWhite = board
    .place(WhiteKing, "a", 1)
    .place(WhiteKing, "h", 1);

  const squares = boardWithWhite.pieces("white");
  assertEquals(squares.length, 2);
  assertEquals(squares[0].piece?.name, "king");

  // Place black pieces
  const finalBoard = boardWithWhite.place(BlackKing, "a", 8).place(
    BlackKing,
    "h",
    8,
  );
  console.log(finalBoard.toString());
});
