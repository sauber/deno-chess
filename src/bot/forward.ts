import type { Chess, Color } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";
import { shuffleArray } from "@hugoalh/shuffle-array";
import { nameToIndex } from "./helpers.ts";

/** Prefer to move forwards */
export class Forward extends Player {
  name = "Forward";
  best = (moves: Moves, game: Chess) => {
    // [index, improvement]
    const player: Color = game.turn();
    const direction: number = player === "w" ? 1 : -1;
    const scores: [number, number][] = moves.map((
      move,
      index,
    ) => [
      index,
      nameToIndex(move.from)[0] - nameToIndex(move.to)[0] * direction,
    ]);

    const sorted = shuffleArray(scores).sort((a, b) => b[1] - a[1]);
    const nearest = sorted[0];
    const index = nearest[0];

    return index;
  };
}
