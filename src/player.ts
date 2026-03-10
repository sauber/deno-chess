import type { Chess, Move } from "chess.js";
import type { Moves } from "./types.ts";
import shuffleArray from "@hugoalh/shuffle-array";

export abstract class Player {
  // Name of player
  public abstract readonly name: string;

  // Most recent move
  public last: Move | undefined;

  /** Identify next move */
  public move(moves: Moves, game: Chess): Move {
    // Score for each move
    const score: [Move, number, number][] = moves.map((
      move,
      index,
    ) => [move, index, this.rank(move, game, moves, index)]);

    // Sort moves by highest score. Pick random if multiple have same highest score.
    const sorted = shuffleArray(score).sort((a, b) => b[2] - a[2]);
    // console.log({ sorted });
    const highest = sorted[0];
    const move: Move = highest[0];
    this.last = move;
    return move;
  }

  /** Calculate score for a move */
  public abstract rank(
    move: Move,
    game: Chess,
    moves: Moves,
    index: number,
  ): number;
}
