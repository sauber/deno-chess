import { type Chess, WHITE } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";

/** Pick last move */
export class Last extends Player {
  name = "Last";
  best = (moves: Moves, chess: Chess) =>
    chess.turn() === WHITE ? moves.length - 1 : 0;
}
