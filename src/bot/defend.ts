import {
  BLACK,
  type Chess,
  type Color,
  type Move,
  PieceSymbol,
  WHITE,
} from "chess.js";
import { Player } from "../player.ts";
import {
  indexToName,
  pieces,
  pieceValue,
  type SquareIndex,
} from "./helpers.ts";

/** Avoid being attacked by opponent pieces */
export class Defend extends Player {
  name = "Defend";
  rank = (move: Move, game: Chess) => {
    const [player, opponent]: [Color, Color] = game.turn() === "w"
      ? [WHITE, BLACK]
      : [BLACK, WHITE];
    const captureValue = move.captured ? pieceValue[move.captured] : 0;
    const promotionValue = move.promotion ? pieceValue[move.promotion] : 0;
    let score = captureValue + promotionValue;
    game.move(move);
    // For each own piece subtract how many are attacking it (attacked by opponent color)
    pieces(player, game).forEach((piece: SquareIndex) => {
      score -= game.attackers(indexToName(piece), opponent).length;
    });

    game.undo();
    return score;
  };
}
