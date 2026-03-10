import type { Move } from "chess.js";
import { Player } from "../player.ts";
import { distance, nameToIndex, type SquareIndex } from "./helpers.ts";

const center: SquareIndex = [3.5, 3.5];

/** Concentrate pieces at edges of board */
export class Edge extends Player {
  name = "Edge";
  rank = (move: Move) =>
    distance(center, nameToIndex(move.to)) /
    distance(center, nameToIndex(move.from));
}
