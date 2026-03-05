import { ansiBoard } from "./ansi-board.ts";
import { Init } from "./setup.ts";

Deno.test("Standard Initial Setup", () => {
  // const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  // console.log(fen);

  const recent = ["e2", "e4", "e7", "e5"];
  const check = ["e1", "e8"];

  const output = ansiBoard(Init, recent, check);
  console.log(output);
});
