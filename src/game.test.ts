import { assertGreaterOrEqual, assertInstanceOf } from "@std/assert";
import { Random } from "./bot/random.ts";
import { ChessGame } from "./game.ts";
import type { Player } from "./types.ts";

// Two players
const white = Random;
const black = Random;

type Winner = Player | null;

Deno.test("Instance", () => {
  const game = new ChessGame(white, black);
  assertInstanceOf(game, ChessGame);
});

Deno.test("Play", () => {
  const game = new ChessGame(white, black);
  const winner: Winner | null = game.play();
  const moves = game.chess.history();
  const count = moves.length;
  console.log("Count of moves: ", count);
  console.log("Winner: ", winner);
  assertGreaterOrEqual(count, 3);
});
