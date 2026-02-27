// import { createSquare, type File, type Rank, type Square } from "./square.ts";
import type { File, Piece, Rank, Square, Vector } from "./rules.ts";
import type { Move } from "./moves.ts";
import type { Pieces } from "./pieces.ts";

/** A chess board of squares */
export class Board {
  constructor(
    public readonly white: Pieces,
    public readonly black: Pieces,
    public readonly latest?: Move,
  ) {
  }

  /**
   * Returns the Square at an offset vector from a given Square.
   * Or returns undefined if the offset is outside of board limits.
   * @param square The starting square.
   * @param offset The vector to offset by, in the format `[rank, file]`.
   * @returns The target Square or undefined.
   */
  target(square: Square, offset: Vector): Square | undefined {
    const file = square.file + offset.file;
    if (file < 0 || file > 7) return undefined;

    const rank = square.rank + offset.rank;
    if (rank < 0 || rank > 7) return undefined;

    return { file: file as File, rank: rank as Rank };
  }

  /**
   * Move a piece from one square to another. Returns a new board with the move applied.
   * Piece on target square may be captured and removed from the board.
   */
  public move(move: Move): Board {
    const { source, target } = move;
    const piece: Piece = source.piece;

    const [set, other] = piece.color === "white"
      ? [this.white, this.black]
      : [this.black, this.white];

    // Capture piece in other set
    const newOther = other.piece(target) ? other.capture(target) : other;

    const newSet = set.move(source, target);

    const [white, black] = piece.color === "white"
      ? [newSet, newOther]
      : [newOther, newSet];

    return new Board(white, black, move);
  }

  /** Which piece, if any is on square */
  public piece(square: Square): Piece | undefined {
    return this.white.piece(square) || this.black.piece(square);
  }
}
