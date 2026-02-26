import { assertEquals } from "@std/assert";
import { Board } from "./board.ts";
import { BlackKing, WhiteKing } from "./rules.ts";
import { isCheck } from "./check.ts";
import { Pieces } from "./pieces.ts";

Deno.test("Not check", () => {
  // Create a board with kings of each color. Test a move to confirm own king will not be in check after the move.
  const board = new Board(
    new Pieces([{ file: 0, rank: 0, piece: WhiteKing }]),
    new Pieces([{ file: 7, rank: 7, piece: BlackKing }]),
  );

  const checked = isCheck("white", board);
  assertEquals(checked, false);
});

// Deno.test("Is check", () => {
//   const board = new Board()
//     .place(WhiteKing, "a", 1)
//     .place(BlackKing, "a", 3);

//   // In this simplified king-only setup, if the black king is at a3,
//   // it doesn't yet check the white king at a1 (kings move 1 square).
//   // But we can verify the check status.
//   assertEquals(isCheck("white", board), false);

//   // Move black king to a2 to put white king in check
//   const blackSource = board.square("a", 3);
//   const blackTarget = board.square("a", 2);
//   const checkBoard = board.move(blackSource, blackTarget);

//   assertEquals(isCheck("white", checkBoard), true);
// });
