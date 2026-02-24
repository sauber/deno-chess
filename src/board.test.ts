import { Board } from "./board.ts";
import { Square } from "./square.ts";

Deno.test("Instance", () => {
  const board = new Board();
  console.log(board.toString());
});

Deno.test("Square", () => {
  const board = new Board();
  const square: Square = board.get("a", 1);
  console.log(square.toString());
});
