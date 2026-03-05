import type { Chess } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";

/** Pick last move */
export class Last extends Player {
  name = "Last";
  best = (moves: Moves, _chess: Chess) => moves.length - 1;
}
