import { Board } from "./board.ts";
import { renderBoard } from "./dashboard.ts";
import type { Move } from "./moves.ts";
import { Pieces } from "./pieces.ts";
import { Player } from "./player.ts";
import { RandomPolicy } from "./policy.ts";
import { BlackKing, WhiteKing } from "./rules.ts";

Deno.test("Instance", () => {
  // Create a board
  const board = new Board(
    new Pieces([{ file: 0, rank: 0, piece: WhiteKing }]),
    new Pieces([{ file: 7, rank: 7, piece: BlackKing }]),
  );

  // Display initial board
  console.log(renderBoard(board));

  // Let player move a piece
  const player = new Player("white", RandomPolicy);
  const move: Move | undefined = player.move(board);
  // const newBoard = move ? board.move(move) : board;

  // Display updated board
  // console.log(renderBoard(newBoard));
});
