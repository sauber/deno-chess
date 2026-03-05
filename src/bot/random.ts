import type { Chess } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";

/** Pick a random move */
export class Random extends Player {
  name = "Random";
  best = (moves: Moves, _chess: Chess) =>
    Math.floor(Math.random() * moves.length);
}
