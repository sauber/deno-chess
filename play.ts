import type { Chess } from "chess.js";
import { gameDashboard } from "./src/game-dashboard.ts";
import { Random } from "./src/bot/random.ts";
import { type Callback, ChessGame } from "./src/game.ts";
import type { Player } from "./src/player.ts";
import { First } from "./src/bot/first.ts";
import { Last } from "./src/bot/last.ts";
import { Hunt } from "./src/bot/hunt.ts";
import { Flee } from "./src/bot/flee.ts";
import { Middle } from "./src/bot/middle.ts";
import { Capture } from "./src/bot/capture.ts";
import { Center } from "./src/bot/center.ts";
import { Edge } from "./src/bot/edge.ts";

// Dashboard callback
let height: number;
const afterMove: Callback = (game: Chess, white: Player, black: Player) => {
  const output: string = gameDashboard(game, white, black);
  const cursorUp: string = height > 0 ? "\x1b[" + height + "A" : "";
  // const cursorUp: string = "\n";
  console.log(cursorUp + output);
  height = output.split("\n").length;
};

// const white: Player = new Flee();
// const black: Player = new Hunt();

const allPlayers: Player[] = [
  new Random(),
  new First(),
  new Middle(),
  new Last(),
  new Hunt(),
  new Flee(),
  new Capture(),
  new Center(),
  new Edge(),
];
const [black, white] = allPlayers.sort(() => Math.random() - 0.5);

const game = new ChessGame(white, black, { afterMove });
game.play();
