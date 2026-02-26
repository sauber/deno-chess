import { Board } from "./board.ts";
import { Game } from "./game.ts";
import { Player } from "./player.ts";
import { assertInstanceOf, assertLessOrEqual } from "@std/assert";
import { BlackKing, WhiteKing } from "./rules.ts";
import { RandomPolicy } from "./policy.ts";
import { Pieces } from "./pieces.ts";

// A board with kings placed in corners
const board = new Board(
  new Pieces([{ file: 0, rank: 0, piece: WhiteKing }]),
  new Pieces([{ file: 7, rank: 7, piece: BlackKing }]),
);

// Players with random policy
const p1 = new Player("white", RandomPolicy);
const p2 = new Player("black", RandomPolicy);

Deno.test("Instance of a game", () => {
  // Setup game
  const game = new Game(board, p1, p2);
  assertInstanceOf(game, Game);
});

Deno.test("Play game", async () => {
  const rounds = 5;
  const game = new Game(board, p1, p2, { max: rounds });
  await game.play();
  assertLessOrEqual(game.moves, rounds);
});
