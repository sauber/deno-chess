import { bots } from "./src/bot/mod.ts";
import type { Player } from "./src/player.ts";
import { ChessGame } from "./src/game.ts";
import { Table } from "@sauber/table";

type PlayerStats = {
  wins: number;
  draws: number;
  losses: number;
  score: number;
  elo: number;
  time: number;
};

type Results = {
  [name: string]: PlayerStats;
};
const results: Results = {};

const rounds = 500;
const K_FACTOR = 32;

for (let i = 1; i <= rounds; i++) {
  // Pick two random players
  const allPlayers: Player[] = bots();
  const [black, white] = allPlayers.sort(() => Math.random() - 0.5);

  // Play game
  const game = new ChessGame(white, black);
  const winner: Player | null = game.play();

  // Initialize player results
  if (!(black.name in results)) {
    results[black.name] = {
      wins: 0,
      draws: 0,
      losses: 0,
      score: 0,
      elo: 1200,
      time: 0,
    };
  }
  if (!(white.name in results)) {
    results[white.name] = {
      wins: 0,
      draws: 0,
      losses: 0,
      score: 0,
      elo: 1200,
      time: 0,
    };
  }

  results[black.name].time += black.time;
  results[white.name].time += white.time;
  // Store current Elo before update
  const eloBlack = results[black.name].elo;
  const eloWhite = results[white.name].elo;

  // Determine game outcome for Elo calculation
  let whiteGameScore: number;

  // Update results
  if (winner === black) {
    results[black.name].wins++;
    results[white.name].losses++;
    whiteGameScore = 0;
  } else if (winner === white) {
    results[white.name].wins++;
    results[black.name].losses++;
    whiteGameScore = 1;
  } else {
    results[black.name].draws++;
    results[white.name].draws++;
    whiteGameScore = 0.5;
  }
  const blackGameScore = 1 - whiteGameScore;

  // Calculate and update Elo ratings
  const expectedWhite = 1 / (1 + 10 ** ((eloBlack - eloWhite) / 400));
  const expectedBlack = 1 - expectedWhite;
  results[white.name].elo = Math.round(
    eloWhite + K_FACTOR * (whiteGameScore - expectedWhite),
  );
  results[black.name].elo = Math.round(
    eloBlack + K_FACTOR * (blackGameScore - expectedBlack),
  );
  // Update score
  // Score is calculated as (3*wins + draw) / (wins+draws+losses)
  for (const n of [black.name, white.name]) {
    // console.log("Name", n);
    const stats: PlayerStats = results[n];
    // console.log({ stats });
    const { wins, losses, draws } = stats;
    if (wins + losses + draws > 0) {
      const score: number = parseFloat(
        ((3 * wins + draws) / (wins + draws + losses)).toFixed(2),
      );
      stats.score = score;
    }
  }

  // Reorder players from highest score to lowest
  const highscore: Record<string, PlayerStats> = Object.fromEntries(
    Object.entries(results).sort((a, b) => b[1].elo - a[1].elo),
  );

  // Display scores
  // console.log("Round #" + i, highscore);
  // console.log(highscore);

  // Create a table with data
  const table = new Table();
  table.title = "Round #" + i;
  table.headers = ["Bot", "Wins", "Draws", "Losses", "Elo", "Time(ms)"];
  table.rows = Object.entries(highscore).map((
    [name, stats],
  ) => [
    name,
    stats.wins,
    stats.draws,
    stats.losses,
    stats.elo,
    Math.round(stats.time),
  ]);
  console.log(table.toString());
}
