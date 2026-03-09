import type { Chess } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";
import shuffleArray from "@hugoalh/shuffle-array";

/** Avoid ending games with a draw, prefer to win */
export class Draw extends Player {
  name = "Draw";
  best = (moves: Moves, game: Chess) => {
    // [index, score]
    const scores: [number, number][] = moves.map((
      move,
      index,
    ) => {
      let score = 0;
      game.move(move);
      if (game.isDraw()) score = -1;
      if (game.isCheck()) score = 1;
      if (move.isCapture()) score = 2;
      if (game.isCheckmate()) score = 3;
      game.undo();
      return [index, score];
    });

    const sorted: [number, number][] = shuffleArray(scores).sort((a, b) =>
      b[1] - a[1]
    );
    const best = sorted[0];
    const moveIndex = best[0];

    return moveIndex;
  };
}
