import type { Move } from "chess.js";
import { Player } from "../player.ts";
import { pieceValue } from "./helpers.ts";

/** Prioritize move which results in capture of opponent piece */
export class Capture extends Player {
  name = "Capture";
  rank = (move: Move) => move.captured ? pieceValue[move.captured] : 0;
}
