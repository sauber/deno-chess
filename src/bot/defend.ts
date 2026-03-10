import { BLACK, type Chess, type Color, type Move, WHITE } from "chess.js";
import { Player } from "../player.ts";
import { indexToName, pieces, type SquareIndex } from "./helpers.ts";

/** Avoid being attacked by opponent pieces */
export class Defend extends Player {
  name = "Defend";
  rank = (move: Move, game: Chess) => {
    const [player, opponent]: [Color, Color] = game.turn() === "w"
      ? [WHITE, BLACK]
      : [BLACK, WHITE];
    game.move(move);
    let score = 0;
    // For each own piece subtract how many are attacking it (attacked by opponent color)
    pieces(player, game).forEach((piece: SquareIndex) => {
      score -= game.attackers(indexToName(piece), opponent).length;
    });

    game.undo();
    return score;
  };
}
