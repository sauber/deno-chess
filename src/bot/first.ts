import type { Chess } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";

/** Pick first move */
export class First extends Player {
  name = "First";
  best = (_moves: Moves, _chess: Chess) => 0;
}
