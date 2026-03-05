import { type Chess, WHITE } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";

/** Pick first move */
export class First extends Player {
  name = "First";
  best = (moves: Moves, chess: Chess) =>
    chess.turn() === WHITE ? 0 : moves.length - 1;
}
