import { bots } from "./src/bot/mod.ts";
import { Tournament } from "./src/tournament-engine.ts";
import type {
  Results,
  TournamentMoveCallback,
} from "./src/tournament-engine.ts";
import { liveTournamentDashboard } from "./src/live-tournament-dashboard.ts";

// Dashboard callback
let height = 0;

const onMove: TournamentMoveCallback = (
  game,
  white,
  black,
  results,
  round,
) => {
  const output = liveTournamentDashboard(game, white, black, results, round);
  const cursorUp = height > 0 ? `\x1b[${height}A` : "";
  console.log(cursorUp + output);
  height = output.split("\n").length;
};

const tournament = new Tournament(bots(), {
  rounds: 500,
  onMove,
  onRoundComplete: () => {}, // onMove handles the final state display
});

tournament.run();
