import { bots } from "./src/bot/mod.ts";
import { Tournament } from "./src/tournament-engine.ts";
import type { Results } from "./src/tournament-engine.ts";
import { tournamentDashboard } from "./src/tournament-dashboard.ts";

// Dashboard callback
let height = 0;
const onRoundComplete = (results: Results, round: number) => {
  const output = tournamentDashboard(results, round);
  const cursorUp = height > 0 ? `\x1b[${height}A` : "";
  console.log(cursorUp + output);
  height = output.split("\n").length;
};

const tournament = new Tournament(bots(), {
  rounds: 500,
  onRoundComplete,
});

tournament.run();
