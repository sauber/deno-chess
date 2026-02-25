import { Board } from "./board.ts";
import { Player } from "./player.ts";
import { RandomPolicy } from "./policy.ts";
import { WhiteKing } from "./rules.ts";

Deno.test("Instance", () => {
  // Create a board
  const board = new Board();
  const square = board.square("a", 1);
  square.piece = WhiteKing;

  // Display initial board
  console.log(board.toString());

  // Let player move a piece
  const policy = RandomPolicy;
  const player = new Player("white", policy);
  player.move(board);

  // Display updated board
  console.log(board.toString());
});
