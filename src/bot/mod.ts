import type { Player } from "../player.ts";

import { Blockade } from "./blockade.ts";
export { Blockade } from "./blockade.ts";
import { Capture } from "./capture.ts";
export { Capture } from "./capture.ts";
import { Center } from "./center.ts";
export { Center } from "./center.ts";
import { Check } from "./check.ts";
export { Check } from "./check.ts";
import { Cover } from "./cover.ts";
export { Cover } from "./cover.ts";
import { Defend } from "./defend.ts";
export { Defend } from "./defend.ts";
import { Ditto } from "./ditto.ts";
export { Ditto } from "./ditto.ts";
import { Draw } from "./draw.ts";
export { Draw } from "./draw.ts";
import { Edge } from "./edge.ts";
export { Edge } from "./edge.ts";
import { Flee } from "./flee.ts";
export { Flee } from "./flee.ts";
import { Forward } from "./forward.ts";
export { Forward } from "./forward.ts";
import { Hunt } from "./hunt.ts";
export { Hunt } from "./hunt.ts";
import { King } from "./king.ts";
export { King } from "./king.ts";
import { Promotion } from "./promotion.ts";
export { Promotion } from "./promotion.ts";
import { Random } from "./random.ts";
export { Random } from "./random.ts";
import { Score } from "./score.ts";
export { Score } from "./score.ts";
import { Steal } from "./steal.ts";
export { Steal } from "./steal.ts";
import { Wall } from "./wall.ts";
export { Wall } from "./wall.ts";

export const bots = (): Player[] => [
  new Score(),
  new Blockade(),
  new Capture(),
  new Center(),
  new Check(),
  new Cover(),
  new Defend(),
  new Ditto(),
  new Draw(),
  new Edge(),
  new Flee(),
  new Forward(),
  new Hunt(),
  new King(),
  new Promotion(),
  new Random(),
  new Score(),
  new Steal(),
  new Wall(),
];
