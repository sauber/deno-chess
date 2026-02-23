import { Board } from "./board.ts";

Deno.test("Instance", () => {
  const board = new Board();
  console.log(board.toString());
});
