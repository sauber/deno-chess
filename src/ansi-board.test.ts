import { ansiBoard } from "./ansi-board.ts";

Deno.test("Standard Initial Setup", () => {
  const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  console.log(fen);

  const output = ansiBoard(fen);
  console.log(output);
});
