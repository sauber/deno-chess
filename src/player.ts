import type { Chess, Color, Move, PieceSymbol, Square } from "chess.js";
import type { Moves } from "./types.ts";

export abstract class Player {
  // Name of player
  public abstract readonly name: string;

  // Most recent move
  public last: Move | undefined;

  /** Identify next move */
  public move(moves: Moves, game: Chess): number {
    const index: number = this.best(moves, game);
    this.last = moves[index];

    // TODO: Identify and record captured pieces

    return index;
  }

  /** Decide index of best move */
  public abstract best(moves: Moves, game: Chess): number;
}
