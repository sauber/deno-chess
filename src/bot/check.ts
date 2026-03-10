import type { Chess, Color, Move } from "chess.js";
import { Player } from "../player.ts";

/** Prefer moves causing check or checkmate to opponent */
export class Check extends Player {
  name = "Check";
  rank = (move: Move, game: Chess) => {
    const color: Color = game.turn();
    let score = 0;
    game.move(move);
    if (game.isAttacked(move.to, color)) score = -1;
    if (game.isCheck()) score = 1;
    if (game.isCheckmate()) score = 2;
    game.undo();
    return score;
  };
}
