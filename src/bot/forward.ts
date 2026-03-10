import type { Chess, Move } from "chess.js";
import { Player } from "../player.ts";
import { nameToIndex } from "./helpers.ts";

/** Prefer to move forwards */
export class Forward extends Player {
  name = "Forward";
  rank = (move: Move, game: Chess) => {
    const direction: number = game.turn() === "w" ? -1 : 1;
    return nameToIndex(move.to)[0] - nameToIndex(move.from)[0] * direction;
  };
}
