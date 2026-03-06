import {
  BLACK,
  type Chess,
  type Color,
  KING,
  type Square,
  WHITE,
} from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";
import { shuffleArray } from "@hugoalh/shuffle-array";
import { distance, nameToIndex, type SquareIndex } from "./helpers.ts";

/** Approach opponent king */
export class King extends Player {
  name = "King";
  best = (moves: Moves, chess: Chess) => {
    const opponent: Color = chess.turn() === "w" ? BLACK : WHITE;

    // const locations: Indices = pieces(opponent, chess);
    const square: Square[] = chess.findPiece({ type: KING, color: opponent });
    if (square.length != 1) throw new Error("King not found");
    const kingSquare: SquareIndex = nameToIndex(square[0]);

    // [index, distance]
    const scores: [number, number][] = moves.map((move, index) => {
      const distanceBefore: number = distance(
        nameToIndex(move.from),
        kingSquare,
      );
      const distanceAfter: number = distance(nameToIndex(move.to), kingSquare);
      const improvement: number = distanceBefore / distanceAfter;
      return [index, improvement];
    });

    // Index of Move with createst relative improvement
    const sorted = shuffleArray(scores).sort((a, b) => b[1] - a[1]);
    const nearest = sorted[0];
    const index = nearest[0];

    return index;
  };
}
