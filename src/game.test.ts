import { Board } from "./board.ts";
import { Game } from "./game.ts";
import { Player } from "./player.ts";
import { assertInstanceOf, assertLessOrEqual } from "@std/assert";
import { BlackKing, WhiteKing } from "./rules.ts";
import { RandomPolicy } from "./policy.ts";

// A board with kings placed in corners
const board = new Board()
  .place(WhiteKing, "a", 1)
  .place(WhiteKing, "h", 1)
  .place(BlackKing, "a", 8)
  .place(BlackKing, "h", 8);

// Players with random policy
const p1 = new Player("white", RandomPolicy);
const p2 = new Player("black", RandomPolicy);

Deno.test("Instance of a game", () => {
  // Setup game
  const game = new Game(board, p1, p2);
  assertInstanceOf(game, Game);
});

Deno.test("Play game", () => {
  const game = new Game(board, p1, p2);
  const rounds = 5;
  game.play(rounds);
  assertLessOrEqual(game.moves, rounds);
});
