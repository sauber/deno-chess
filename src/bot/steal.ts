import { BLACK, type Chess, type Color, type Move, WHITE } from "chess.js";
import { Player } from "../player.ts";
import { pieceValue } from "./helpers.ts";

/** Take a piece without being captured */
export class Steal extends Player {
  name = "Steal";
  rank = (move: Move, game: Chess): number => {
    // Capture Value
    const captureValue: number = move.captured ? pieceValue[move.captured] : 0;

    // Is piece under attack after move?
    const opponent: Color = game.turn() === "w" ? BLACK : WHITE;
    const attackers = game.attackers(move.to, opponent);
    const attackValue: number = attackers.length > 0
      ? pieceValue[move.piece]
      : 0;

    // Improvement piece value
    const improvement: number = captureValue - attackValue;
    return improvement;
  };
}
