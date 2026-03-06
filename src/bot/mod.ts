import type { Player } from "../player.ts";

import { Capture } from "./capture.ts";
export { Capture } from "./capture.ts";
import { Center } from "./center.ts";
export { Center } from "./center.ts";
import { Edge } from "./edge.ts";
export { Edge } from "./edge.ts";
import { First } from "./first.ts";
export { First } from "./first.ts";
import { Flee } from "./flee.ts";
export { Flee } from "./flee.ts";
import { Hunt } from "./hunt.ts";
export { Hunt } from "./hunt.ts";
import { King } from "./king.ts";
export { King } from "./king.ts";
import { Last } from "./last.ts";
export { Last } from "./last.ts";
import { Middle } from "./middle.ts";
export { Middle } from "./middle.ts";
import { Promotion } from "./promotion.ts";
export { Promotion } from "./promotion.ts";
import { Random } from "./random.ts";
export { Random } from "./random.ts";
import { Steal } from "./steal.ts";
export { Steal } from "./steal.ts";

export const bots = (): Player[] => [
  new Capture(),
  new Center(),
  new Edge(),
  new First(),
  new Flee(),
  new Hunt(),
  new King(),
  new Last(),
  new Middle(),
  new Promotion(),
  new Random(),
  new Steal(),
];
