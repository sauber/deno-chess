import type { Chess, Move } from "chess.js";
import type { Moves } from "./types.ts";
import shuffleArray from "@hugoalh/shuffle-array";

export abstract class Player {
  // Name of player
  public abstract readonly name: string;

  // Most recent move
  public last: Move | undefined;

  /** Identify next move */
  private best(moves: Moves, game: Chess): Move {
    // If there is only one move, there is no choice
    if (moves.length === 1) return moves[0];

    // Score for each move
    const score: [Move, number, number][] = moves.map((
      move,
      index,
    ) => [move, this.rank(move, game, moves, index), index]);

    // Sort moves by highest score. Pick random if multiple have same highest score.
    const sorted = shuffleArray(score).sort((a, b) => b[1] - a[1]);
    // console.log(
    //   sorted.map((move) =>
    //     `${move[0].from}->${move[0].to} ${move[1].toPrecision(2)}`
    //   ),
    // );
    const highest = sorted[0];
    const move: Move = highest[0];
    return move;
  }
  /** Identify next move */
  public move(moves: Moves, game: Chess): Move {
    // Best move
    const move: Move = this.best(moves, game);

    // Record move as most recent
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
