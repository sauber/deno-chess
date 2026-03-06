import { BLACK, type Chess, type Color, WHITE } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";
import { shuffleArray } from "@hugoalh/shuffle-array";
import {
  distanceToNearest,
  type Indices,
  nameToIndex,
  pieces,
} from "./helpers.ts";

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
