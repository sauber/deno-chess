import type { Chess } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";
import { shuffleArray } from "@hugoalh/shuffle-array";
import { distance, nameToIndex, type SquareIndex } from "./helpers.ts";

const center: SquareIndex = [3.5, 3.5];

/** Concentrate pieces at edges of board */
export class Edge extends Player {
  name = "Edge";
  best = (moves: Moves, _chess: Chess) => {
    // [index, improvement]
    const scores: [number, number][] = moves.map((
      move,
      index,
    ) => [
      index,
      distance(center, nameToIndex(move.from)) /
      distance(center, nameToIndex(move.to)),
    ]);

    // Index of Move improving distance to center
    const sorted = shuffleArray(scores).sort((a, b) => a[1] - b[1]);
    const nearest = sorted[0];
    const index = nearest[0];

    return index;
  };
}
