import type { Chess, Move } from "chess.js";
import { Player } from "../player.ts";

/** Rather win than draw */
export class Draw extends Player {
  name = "Draw";
  rank = (move: Move, game: Chess) => {
    let score = 0;
    game.move(move);
    if (game.isDraw()) score = -1;
    if (game.isCheck()) score = 1;
    if (move.isCapture()) score = 2;
    if (game.isCheckmate()) score = 3;
    game.undo();
    return score;
  };
}
