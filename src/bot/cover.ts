import type { Chess, Move } from "chess.js";
import { Player } from "../player.ts";
import { indexToName, pieces, type SquareIndex } from "./helpers.ts";

/** Protect own pieces */
export class Cover extends Player {
  name = "Cover";
  rank = (move: Move, game: Chess) => {
    const player = game.turn();
    game.move(move);
    let score = 0;
    // For each own piece add how many are defending it (attacked by own color)
    pieces(player, game).forEach((piece: SquareIndex) => {
      score += game.attackers(indexToName(piece), player).length;
    });
    game.undo();
    return score;
  };
}
