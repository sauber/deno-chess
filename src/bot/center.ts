import type { Move } from "chess.js";
import { Player } from "../player.ts";
import { distance, nameToIndex, type SquareIndex } from "./helpers.ts";

const center: SquareIndex = [3.5, 3.5];

/** Concentrate pieces at center of board */
export class Center extends Player {
  name = "Center";
  rank = (move: Move): number =>
    distance(center, nameToIndex(move.from)) /
    distance(center, nameToIndex(move.to));
}
