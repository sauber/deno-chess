import { BLACK, type Chess, type Color, type Move, WHITE } from "chess.js";
import { Player } from "../player.ts";
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
  rank = (move: Move, chess: Chess) => {
    const opponent: Color = chess.turn() === "w" ? BLACK : WHITE;
    const locations: Indices = pieces(opponent, chess);
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
    return score;
  };
}
