import { assertEquals } from "@std/assert";
import { Board } from "./board.ts";
import { legalMoves } from "./moves.ts";
import { BlackKing, WhiteKing } from "./rules.ts";
import { isCheck } from "./check.ts";

Deno.test("Not check", () => {
  // Create a board with kings of each color. Test a move to confirm own king will not be in check after the move.
  const board = new Board()
    .place(WhiteKing, "a", 1)
    .place(BlackKing, "h", 8);

  const whiteKingSquare = board.square("a", 1);
  const moves = legalMoves(WhiteKing, whiteKingSquare, board);

  // Moving from a1 to a2 should be legal as it doesn't put the king in check
  const moveToA2 = moves.find((m) => m[1].file === "a" && m[1].rank === 2);
  assertEquals(!!moveToA2, true);

  if (moveToA2) {
    const newBoard = board.move(moveToA2[0], moveToA2[1]);
    assertEquals(isCheck("white", newBoard), false);
  }
});

Deno.test("Is check", () => {
  const board = new Board()
    .place(WhiteKing, "a", 1)
    .place(BlackKing, "a", 3);

  // In this simplified king-only setup, if the black king is at a3,
  // it doesn't yet check the white king at a1 (kings move 1 square).
  // But we can verify the check status.
  assertEquals(isCheck("white", board), false);

  // Move black king to a2 to put white king in check
  const blackSource = board.square("a", 3);
  const blackTarget = board.square("a", 2);
  const checkBoard = board.move(blackSource, blackTarget);

  assertEquals(isCheck("white", checkBoard), true);
});
