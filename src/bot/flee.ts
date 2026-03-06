import { BLACK, type Chess, type Color, WHITE } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";
import { shuffleArray } from "@hugoalh/shuffle-array";
import {
  distanceToNearest,
  type Indices,
  nameToIndex,
  pieces,
  type SquareIndex,
} from "./helpers.ts";

/** Reduce distance to opponent pieces */
export class Flee extends Player {
  name = "Flee";
  best = (moves: Moves, chess: Chess) => {
    const opponent: Color = chess.turn() === "w" ? BLACK : WHITE;

    const locations: Indices = pieces(opponent, chess);

    // [index, distance]
    const scores: [number, number, number, number][] = moves.map((
      move,
      index,
    ) => {
      const from: SquareIndex = nameToIndex(move.from);
      const distanceBefore = distanceToNearest(from, locations);
      const target: SquareIndex = nameToIndex(move.to);

      // List of locations remaining after a capture
      const capture = locations.filter((index) =>
        index[0] !== target[0] || index[1] !== target[1]
      );
      const distanceAfter = distanceToNearest(
        target,
        capture,
      );
      const score = distanceAfter / distanceBefore;
      if (isNaN(score)) throw new Error("Distance is Nan");
      return [index, score, distanceBefore, distanceAfter];
    });

    // Index of Move arriving closest to opponent piece
    const sorted = shuffleArray(scores).sort((a, b) => b[1] - a[1]);
    const nearest = sorted[0];
    const index = nearest[0];

    return index;
  };
}
