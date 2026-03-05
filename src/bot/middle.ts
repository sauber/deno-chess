import type { Chess } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";

/** Pick move from middle of list */
export class Middle extends Player {
  name = "Middle";
  best = (moves: Moves, _chess: Chess) => Math.floor(moves.length / 2);
}
