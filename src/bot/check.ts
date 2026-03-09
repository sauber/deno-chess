import type { Chess, Color } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";
import shuffleArray from "@hugoalh/shuffle-array";

/** Use check or checkmate moves, if possible */
export class Check extends Player {
  name = "Check";
  best = (moves: Moves, game: Chess) => {
    const color: Color = game.turn();
    // [index, score]
    const scores: [number, number][] = moves.map((
      move,
      index,
    ) => {
      let score = 0;
      game.move(move);
      if (game.isAttacked(move.to, color)) score = -1;
      if (game.isCheck()) score = 1;
      if (game.isCheckmate()) score = 2;
      game.undo();
      return [index, score];
    });

    const sorted: [number, number][] = shuffleArray(scores).sort((a, b) =>
      b[1] - a[1]
    );
    const best = sorted[0];
    // if (best[1] > 0) console.log({ sorted });
    const moveIndex = best[0];

    return moveIndex;
  };
}
