import { Player } from "../player.ts";

/** Pick a random move */
export class Random extends Player {
  name = "Random";
  rank = (): number => Math.random();
}
