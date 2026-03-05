import type { Moves, Player } from "../types.ts";

/** Pick a random move */
export const Random: Player = {
  name: "Random",
  move: (moves: Moves) => Math.floor(Math.random() * moves.length),
};
