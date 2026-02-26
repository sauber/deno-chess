import type { Color, File, Piece, Rank, Square } from "./rules.ts";

/** A piece on a board square */
export type Position = {
  file: File;
  rank: Rank;
  piece: Piece;
};

/** An immutable collection of pieces placed on a board */
export class Pieces {
  public readonly color: Color;
  public readonly king: Position;

  constructor(private readonly positions: Position[] = []) {
    // Confirm all pieces are same color
    const colors = positions.map((p) => p.piece.color);
    const uniqueColors = new Set(colors);
    if (uniqueColors.size !== 1) {
      throw new Error("All pieces must be same color");
    }
    this.color = colors[0];

    // Confirm there is exactly one king
    const kings = positions.filter((p) => p.piece.name === "king");
    if (kings.length !== 1) {
      throw new Error(this.color + "must have exactly one king");
    }
    this.king = kings[0];
  }

  /** Index of piece on square */
  private findIndexOf(square: Square): number {
    const index = this.positions.findIndex((p) =>
      p.file === square.file && p.rank === square.rank
    );
    // console.log(
    //   `Board findIndexOf ${index} source (${square.file}, ${square.rank})`,
    // );
    // if (index === -1) {
    //   console.log(
    //     this.positions.map((p) => `${p.piece.name} ${p.file}, ${p.rank}`),
    //   );
    // }
    return index;
  }

  /** Piece at position, if any */
  public piece(square: Square): Piece | undefined {
    const index = this.findIndexOf(square);
    if (index === -1) return undefined;
    return this.positions[index].piece;
  }

  /** Remove piece on square */
  public capture(square: Square): Pieces {
    const index = this.findIndexOf(square);

    // No piece on square
    if (index === -1) throw new Error("No piece at position");

    // Confirm king is not captured
    if (this.positions[index].piece.name === "king") {
      throw new Error("King cannot be captured");
    }

    // Create new set with piece excluded
    const newPositions = [...this.positions];
    newPositions.splice(index, 1);
    return new Pieces(newPositions);
  }

  /** Number of pieces */
  public get length(): number {
    return this.positions.length;
  }

  /** Sum of piece values */
  public get value(): number {
    return this.positions.reduce((sum, p) => sum + p.piece.value, 0);
  }

  /** Move a piece to another square */
  public move(source: Square, target: Square): Pieces {
    // console.log(
    //   `Pieces move source (${source.file}, ${source.rank}) -> (${target.file}, ${target.rank})`,
    // );
    const index = this.findIndexOf(source);
    if (index === -1) throw new Error("No piece at position");
    const newPositions: Position[] = [
      ...this.positions.map((p) => ({
        piece: p.piece,
        file: p.file,
        rank: p.rank,
      })),
    ];
    newPositions[index].file = target.file;
    newPositions[index].rank = target.rank;
    return new Pieces(newPositions);
  }

  /** All positions  */
  public get all(): Position[] {
    return this.positions;
  }
}
