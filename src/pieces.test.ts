import { assertEquals, assertThrows } from "@std/assert";
import { Pieces } from "./pieces.ts";
import { BlackKing, WhiteKing, WhiteRook } from "./rules.ts";

Deno.test("Empty set", () => {
  assertThrows(() => {
    new Pieces();
  });
});

Deno.test("Different colors", () => {
  assertThrows(() => {
    new Pieces([
      { file: 0, rank: 0, piece: WhiteKing },
      { file: 1, rank: 1, piece: BlackKing },
    ]);
  });
});

Deno.test("Multiple kings", () => {
  assertThrows(() => {
    new Pieces([
      { file: 0, rank: 0, piece: WhiteKing },
      { file: 1, rank: 1, piece: WhiteKing },
    ]);
  });
});

Deno.test("Value", () => {
  const pieces = new Pieces([
    { file: 0, rank: 0, piece: WhiteKing },
  ]);
  assertEquals(pieces.value, 0);
});

Deno.test("No piece at position", () => {
  const pieces = new Pieces([
    { file: 0, rank: 0, piece: WhiteKing },
  ]);
  const piece = pieces.piece({ file: 1, rank: 1 });
  assertEquals(piece, undefined);
});

Deno.test("Get Piece at Position", () => {
  const pieces = new Pieces([
    { file: 0, rank: 0, piece: WhiteKing },
  ]);
  const piece = pieces.piece({ file: 0, rank: 0 });
  assertEquals(piece, WhiteKing);
});

Deno.test("Capture King", () => {
  const pieces = new Pieces([
    { file: 0, rank: 0, piece: WhiteKing },
  ]);
  assertThrows(() => {
    pieces.capture({ file: 0, rank: 0 });
  });
});

Deno.test("Capture Piece", () => {
  const pieces = new Pieces([
    { file: 0, rank: 0, piece: WhiteKing },
    { file: 1, rank: 1, piece: WhiteRook },
  ]);
  assertEquals(pieces.length, 2);
  assertEquals(pieces.value, 9);

  const reducesPieces: Pieces = pieces.capture({ file: 1, rank: 1 });
  assertEquals(reducesPieces.length, 1);
  assertEquals(reducesPieces.value, 0);
});

Deno.test("Move Piece", () => {
  const pieces = new Pieces([
    { file: 0, rank: 0, piece: WhiteKing },
  ]);
  const movePieces = pieces.move({ file: 0, rank: 0 }, { file: 1, rank: 1 });
  assertEquals(movePieces.length, 1);
  assertEquals(movePieces.value, 0);
  assertEquals(movePieces.king, { rank: 1, file: 1, piece: WhiteKing });
});
