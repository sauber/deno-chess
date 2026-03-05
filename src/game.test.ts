import {
  assertGreaterOrEqual,
  assertInstanceOf,
  assertLessOrEqual,
} from "@std/assert";
import { Random } from "./bot/random.ts";
import { ChessGame } from "./game.ts";
import type { Player } from "./player.ts";

// Two players
const white = new Random();
const black = new Random();

type Winner = Player | null;

Deno.test("Instance", () => {
  const game = new ChessGame(white, black);
  assertInstanceOf(game, ChessGame);
});

Deno.test("Play", () => {
  const game = new ChessGame(white, black);
  const max = 5;
  const winner: Winner | null = game.play(max);
  const moves = game.chess.history();
  const count = moves.length;
  console.log("Count of moves: ", count);
  console.log("Winner: ", winner);
  assertGreaterOrEqual(count, 3);
  assertLessOrEqual(count, max);
});
