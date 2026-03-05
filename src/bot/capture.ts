import type { Chess, PieceSymbol } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";
import shuffleArray from "@hugoalh/shuffle-array";

/** Prioritize move which results in capture of opponent piece */
export class Capture extends Player {
  name = "Capture";
  best = (moves: Moves, _chess: Chess) => {
    // [index, score]
    const scores: [number, number][] = moves.map((
      move,
      index,
    ) => {
      // 0 points if no capture
      if (!move.captured) return [index, 0];

      // Value of captured piece
      const capture: PieceSymbol = move.captured;
      const pieceValue = {
        p: 1,
        n: 3,
        b: 3,
        r: 7,
        q: 9,
        k: 1000,
      };
      const points: number = pieceValue[capture];
      return [index, points];
    });

    const sorted: [number, number][] = shuffleArray(scores).sort((a, b) =>
      b[1] - a[1]
    );
    const best = sorted[0];
    const moveIndex = best[0];

    return moveIndex;
  };
}
