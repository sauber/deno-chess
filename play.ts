import type { Chess } from "chess.js";
import { gameDashboard } from "./src/game-dashboard.ts";
import { type Callback, ChessGame } from "./src/game.ts";
import type { Player } from "./src/player.ts";
import { bots } from "./src/bot/mod.ts";

// Dashboard callback
let height: number;
const afterMove: Callback = (game: Chess, white: Player, black: Player) => {
  const output: string = gameDashboard(game, white, black);
  const cursorUp: string = height > 0 ? "\x1b[" + height + "A" : "";
  // const cursorUp: string = "\n";
  console.log(cursorUp + output);
  height = output.split("\n").length;
};

const allPlayers: Player[] = bots();
const [black, white] = allPlayers.sort(() => Math.random() - 0.5);

const game = new ChessGame(white, black, { afterMove });
game.play();
console.log(game.chess.pgn());
