import type { Chess } from "chess.js";
import type { Moves } from "../types.ts";
import { type Index, nameToIndex, Player } from "../player.ts";
import { shuffleArray } from "@hugoalh/shuffle-array";

// Geometric distance between two points
type Point = [number, number];
function distance(p1: Point, p2: Point): number {
  return Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);
}

/** Given an Index on board, what is distance to center */
function distanceToCenter(index: Index): number {
  return distance([3.5, 3.5], index);
}

/** Concentrate pieces at edges of board */
export class Edge extends Player {
  name = "Edge";
  best = (moves: Moves, _chess: Chess) => {
    // [index, distance]
    const scores: [number, number][] = moves.map((
      move,
      index,
    ) => [
      index,
      distanceToCenter(nameToIndex(move.from)) /
      distanceToCenter(nameToIndex(move.to)),
    ]);

    // Index of Move improving distance to center
    const sorted = shuffleArray(scores).sort((a, b) => a[1] - b[1]);
    const nearest = sorted[0];
    const index = nearest[0];

    return index;
  };
}
