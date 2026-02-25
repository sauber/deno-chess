import type { Board } from "./board.ts";
import { type Move, playerMoves } from "./moves.ts";
import type { Color } from "./rules.ts";

/** Given a board decide best move for player */
export interface Policy {
  (color: Color, board: Board): Move;
}

export const RandomPolicy: Policy = (color: Color, board: Board) => {
  const moves: Move[] = playerMoves(color, board);
  const bestMove = moves[Math.floor(Math.random() * moves.length)];
  return bestMove;
};
