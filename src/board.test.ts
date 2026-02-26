import { assertEquals } from "@std/assert";
import { Board } from "./board.ts";
// import { renderBoard } from "./dashboard.ts";
import { BlackKing, WhiteKing } from "./rules.ts";
import { Pieces } from "./pieces.ts";

const white = new Pieces([{ file: 0, rank: 0, piece: WhiteKing }]);
const black = new Pieces([{ file: 0, rank: 0, piece: BlackKing }]);

Deno.test("Instance", () => {
  const board = new Board(white, black);
  assertEquals(board.white.length, 1);
  assertEquals(board.black.length, 1);
  // console.log(renderBoard(board));
});
