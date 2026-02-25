import { Board } from "./board.ts";
import { Player } from "./player.ts";
import { RandomPolicy } from "./policy.ts";
import { WhiteKing } from "./rules.ts";

Deno.test("Instance", () => {
  // Create a board
  let board = new Board();
  board = board.place(WhiteKing, "a", 1);

  // Display initial board
  console.log(board.toString());

  // Let player move a piece
  const player = new Player("white", RandomPolicy);
  const move = player.move(board);
  const newBoard = move ? board.move(move[0], move[1]) : board;

  // Display updated board
  console.log(newBoard.toString());
});
