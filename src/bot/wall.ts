import type { Chess, Color } from "chess.js";
import type { Moves } from "../types.ts";
import { Player } from "../player.ts";
import { shuffleArray } from "@hugoalh/shuffle-array";
import { indexToName, nameToIndex, pieces } from "./helpers.ts";
import { avg, std } from "@sauber/statistics";

/** Let all pieces form a thick line */
export class Wall extends Player {
  name = "Wall";
  best = (moves: Moves, game: Chess) => {
    // [index, improvement]
    const player: Color = game.turn();
    const direction: number = player === "w" ? 1 : -1;
    const scores: [number, number][] = moves.map((
      move,
      index,
    ) => {
      const ranks: number[] = pieces(player, game).filter((piece) =>
        move.from !== indexToName(piece)
      )
        .map((piece) => piece[0]);
      ranks.push(nameToIndex(move.to)[0]);
      const mean = avg(ranks);
      const dist = std(ranks.map((rank) => rank - mean));
      const score =
        ((nameToIndex(move.from)[0] - nameToIndex(move.to)[0]) * direction > 0
          ? 0
          : 1) +
        dist;
      return [index, score];
    });

    const sorted = shuffleArray(scores).sort((a, b) => a[1] - b[1]);
    // console.log({ sorted });
    const nearest = sorted[0];
    const index = nearest[0];

    return index;
  };
}
