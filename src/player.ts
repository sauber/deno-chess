import type { Board } from "./board.ts";
import type { Move } from "./moves.ts";
import type { Policy } from "./policy.ts";
import type { Color } from "./rules.ts";

/** Perform a move as a player */
export class Player {
  constructor(readonly color: Color, readonly policy: Policy) {}

  /** Scan all the pieces on the board having color of player.
   * Compile list of all valid moves.
   * Pick best move.
   * Move piece on board.
   */
  public move(board: Board): Move | undefined {
    // Pick best by player policy
    return this.policy.move(this.color, board);
  }
}
