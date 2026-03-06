import type { Chess } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";
import { shuffleArray } from "@hugoalh/shuffle-array";
import { distance, nameToIndex, type SquareIndex } from "./helpers.ts";

const center: SquareIndex = [3.5, 3.5];

/** Concentrate pieces at center of board */
export class Center extends Player {
  name = "Center";
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
    const sorted = shuffleArray(scores).sort((a, b) => b[1] - a[1]);
    const nearest = sorted[0];
    const index = nearest[0];

    return index;
  };
}
