import type { Chess, Move } from "chess.js";
import { Player } from "../player.ts";

/** Limit opponent movement */
export class Blockade extends Player {
  name = "Blockade";
  rank = (move: Move, game: Chess): number => {
    game.move(move);
    const moves: number = game.moves().length;
    game.undo();
    // The more moves opponent has, the worse
    return -moves;
  };
}
