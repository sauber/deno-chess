import { Board } from "./board.ts";
import { Player } from "./player.ts";
import { WhiteKing } from "./rules.ts";

Deno.test("Instance", () => {
  const board = new Board();
  const square = board.square("a", 1);
  square.piece = WhiteKing;

  // Display initial board
  console.log(board.toString());

  // Let player move a piece
  const player = new Player("white", board);
  player.move();

  // Display updated board
  console.log(board.toString());
});
