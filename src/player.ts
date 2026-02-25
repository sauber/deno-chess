import type { Board } from "./board.ts";
import type { Move } from "./moves.ts";
import type { Policy } from "./policy.ts";
import type { Color } from "./rules.ts";

/** Perform a move as a player */
export class Player {
  constructor(private readonly color: Color, private readonly policy: Policy) {}

  /** Scan all the pieces on the board having color of player.
   * Compile list of all valid moves.
   * Pick best move.
   * Move piece on board.
   */
  public move(board: Board): Move {
    // Pick best by player policy
    const bestMove = this.policy(this.color, board);

    // Debug move
    console.log("Best Move:", bestMove[0].name, "->", bestMove[1].name);

    // Update board
    board.move(bestMove[0], bestMove[1]);

    // Inform best move
    return bestMove;
  }
}
