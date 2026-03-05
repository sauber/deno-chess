import { BLACK, type Chess, type Color, WHITE } from "chess.js";
import type { Moves } from "../types.ts";
import {
  type Index,
  type Indices,
  nameToIndex,
  pieces,
  Player,
} from "../player.ts";
import { shuffleArray } from "@hugoalh/shuffle-array";

// Geometric distance between two points
type Point = [number, number];
function distance(p1: Point, p2: Point): number {
  return Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);
}

/** Given an Index on board, what is distance to nearest opponent */
function distanceToNearest(from: Index, other: Indices): number {
  const distances: number[] = other.map((square: Index) =>
    distance(from, square)
  );
  const sorted = distances.sort((a, b) => a - b);
  const shortest = sorted[0];
  return shortest;
}

/** Reduce distance to opponent pieces */
export class Hunt extends Player {
  name = "Hunt";
  best = (moves: Moves, chess: Chess) => {
    const opponent: Color = chess.turn() === "w" ? BLACK : WHITE;

    const locations: Indices = pieces(opponent, chess);

    // [index, distance]
    const scores: [number, number][] = moves.map((
      move,
      index,
    ) => [index, distanceToNearest(nameToIndex(move.to), locations)]);

    // Index of Move arriving closest to opponent piece
    const sorted = shuffleArray(scores).sort((a, b) => a[1] - b[1]);
    const nearest = sorted[0];
    const index = nearest[0];

    return index;
  };
}
