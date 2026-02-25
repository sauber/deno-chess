import { Board } from "./board.ts";
import { Game } from "./game.ts";
import { Player } from "./player.ts";
import { assertInstanceOf, assertLessOrEqual } from "@std/assert";
import { BlackKing, WhiteKing } from "./rules.ts";
import { RandomPolicy } from "./policy.ts";

// A board with kings placed in corners
const board = new Board();
board.square("a", 1).piece = WhiteKing;
board.square("h", 1).piece = WhiteKing;
board.square("a", 8).piece = BlackKing;
board.square("h", 8).piece = BlackKing;

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
