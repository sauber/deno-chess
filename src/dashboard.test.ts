import { assertStringIncludes } from "@std/assert";
import { Board } from "./board.ts";
import { renderBoard, renderGameStats } from "./dashboard.ts";
import { Game } from "./game.ts";
import { Player } from "./player.ts";
import { RandomPolicy } from "./policy.ts";
import { Pieces } from "./pieces.ts";
import { BlackKing, WhiteKing } from "./rules.ts";

Deno.test("Render empty board", () => {
  const board = new Board(
    new Pieces([{ file: 0, rank: 0, piece: WhiteKing }]),
    new Pieces([{ file: 7, rank: 7, piece: BlackKing }]),
  );
  const rendered = renderBoard(board);
  assertStringIncludes(rendered, " ");
  assertStringIncludes(rendered, "\n");
  assertStringIncludes(rendered, " a  b  c  d  e  f  g  h ");
  assertStringIncludes(rendered, "1 ");
  assertStringIncludes(rendered, "8 ");
});

Deno.test("Render Stats", async () => {
  const board = new Board(
    new Pieces([{ file: 0, rank: 0, piece: WhiteKing }]),
    new Pieces([{ file: 7, rank: 7, piece: BlackKing }]),
  );

  const p1 = new Player("white", RandomPolicy);
  const p2 = new Player("black", RandomPolicy);
  const game = new Game(board, p1, p2, { max: 10 });
  await game.play();
  const rendered = renderGameStats(game);
  assertStringIncludes(rendered, "Moves:");
  assertStringIncludes(rendered, "White: Random");
  assertStringIncludes(rendered, "Black: Random");
});
