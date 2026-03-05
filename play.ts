import type { Chess } from "chess.js";
import { gameDashboard } from "./src/game-dashboard.ts";
import { Random } from "./src/bot/random.ts";
import { type Callback, ChessGame } from "./src/game.ts";
import type { Player } from "./src/player.ts";
import { First } from "./src/bot/first.ts";

// Dashboard callback
let height = 0;
const afterMove: Callback = (game: Chess, white: Player, black: Player) => {
  const output: string = gameDashboard(game, white, black);
  const cursorUp: string = height > 0 ? "\x1b[" + height + "A" : "";
  console.log(cursorUp + output);
  height = output.split("\n").length;
};

const white: Player = new Random();
const black: Player = new First();
const game = new ChessGame(white, black, { afterMove });
game.play();
