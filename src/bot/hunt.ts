import { BLACK, type Chess, type Color, type Move, WHITE } from "chess.js";
import { Player } from "../player.ts";
import {
  distanceToNearest,
  type Indices,
  nameToIndex,
  pieces,
} from "./helpers.ts";

/** Reduce distance to opponent pieces */
export class Hunt extends Player {
  name = "Hunt";
  rank = (move: Move, game: Chess): number => {
    const opponent: Color = game.turn() === "w" ? BLACK : WHITE;
    const locations: Indices = pieces(opponent, game);
    const distance: number = distanceToNearest(nameToIndex(move.to), locations);
    // Smallest distance is better
    return -distance;
  };
}
