import { Chess } from "chess.js";
import { Random } from "./bot/random.ts";
import { gameDashboard } from "./game-dashboard.ts";
import { assertEquals } from "@std/assert/equals";
import type { Player } from "./player.ts";

const white: Player = new Random();
const black: Player = new Random();
const chess = new Chess();

Deno.test("No moves", () => {
  const output: string = gameDashboard(chess, white, black);
  console.log(output);
  assertEquals(output.split("\n").length, 9);
});
