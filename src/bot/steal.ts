import { BLACK, type Chess, type Color, WHITE } from "chess.js";
import { Player } from "../player.ts";
import type { Moves } from "../types.ts";
import { pieceValue } from "./helpers.ts";
import shuffleArray from "@hugoalh/shuffle-array";

/** Take a piece without being captured */
export class Steal extends Player {
  name = "Steal";
  best = (moves: Moves, game: Chess) => {
    // [index, improvement]
    const scores: [number, number][] = moves.map((move, index) => {
      // Capture Value
      const captureValue: number = move.captured
        ? pieceValue[move.captured]
        : 0;

      // Is piece under attack after move?
      const opponent: Color = game.turn() === "w" ? BLACK : WHITE;
      const attackers = game.attackers(move.to, opponent);
      const attackValue: number = attackers.length > 0
        ? pieceValue[move.piece]
        : 0;

      // Improvement piece value
      const improvement: number = captureValue - attackValue;
      return [index, improvement];
    });

    // Index of Move with createst relative improvement
    const sorted = shuffleArray(scores).sort((a, b) => b[1] - a[1]);
    const nearest = sorted[0];
    const index = nearest[0];

    return index;
  };
}
