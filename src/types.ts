import type { Chess, Move } from "chess.js";

export type Moves = Move[];

/** Definition of Player */
export interface Player {
  /** Name of player */
  name: string;

  /** Decide index of best move from a list of legal moves  */
  move: (moves: Moves, chess: Chess) => number;
}
