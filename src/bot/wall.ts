import type { Chess, Color, Move } from "chess.js";
import { Player } from "../player.ts";
import { indexToName, nameToIndex, pieces, type RankIndex } from "./helpers.ts";
import { std as StdDev } from "@sauber/statistics";

/** Let all pieces form a thick line */
export class Wall extends Player {
  name = "Wall";
  rank = (move: Move, game: Chess): number => {
    // Color of player
    const color: Color = game.turn();

    // In which direction is forward
    const forward: number = color === "w" ? -1 : 1;

    // RankIndex of all pieces after move
    const ranks: RankIndex[] = pieces(color, game).filter((piece) =>
      move.from !== indexToName(piece)
    ).map((piece) => piece[0]);
    ranks.push(nameToIndex(move.to)[0]);

    // Standard deviation of all RankIndex
    const dist = StdDev(ranks);

    // Forward distance of move
    const forwardDistance: number =
      (nameToIndex(move.to)[0] - nameToIndex(move.from)[0]) * forward;

    // Forward is good. StdDev is bad.
    const score = (forwardDistance > 0 ? 1 : 0) - dist;
    return score;
  };
}
