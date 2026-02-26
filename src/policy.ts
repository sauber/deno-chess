import type { Board } from "./board.ts";
import { type Move, playerMoves } from "./moves.ts";
import type { Color } from "./rules.ts";

/** Given a board decide move for player according to policy */
export interface Policy {
  name: string;
  move: (color: Color, board: Board) => Move | undefined;
}

/** Pick a random move from all possible moves */
export const RandomPolicy: Policy = {
  name: "Random",
  move: (color: Color, board: Board): Move | undefined => {
    // console.log(`Policy ${color}`);
    const moves: Move[] = playerMoves(color, board);
    // console.log("Policy moves count", moves.length);
    if (moves.length === 0) return undefined;
    const randomMove: Move = moves[Math.floor(Math.random() * moves.length)];
    return randomMove;
  },
};
