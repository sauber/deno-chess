import { assert } from "node:console";
import { Board } from "./board.ts";
import { renderBoard, renderGameStats } from "./dashboard.ts";
import { Game } from "./game.ts";
import { Player } from "./player.ts";
import { RandomPolicy } from "./policy.ts";

Deno.test("Render empty board", () => {
  const board = new Board();
  const rendered = renderBoard(board);
  assert(rendered.includes(" "));
  assert(rendered.includes("\n"));
  assert(rendered.includes("a"));
  assert(rendered.includes("h"));
  assert(rendered.includes("1"));
  assert(rendered.includes("8"));
});

Deno.test("Render Stats", () => {
  const p1 = new Player("white", RandomPolicy);
  const p2 = new Player("black", RandomPolicy);
  const game = new Game(new Board(), p1, p2);
  game.play(10);
  const rendered = renderGameStats(game);
  assert(rendered.includes("Moves:"));
  assert(rendered.includes("White:"));
  assert(rendered.includes("Black:"));
});
