import { bots } from "./src/bot/mod.ts";
import type { Player } from "./src/player.ts";
import { ChessGame } from "./src/game.ts";

type PlayerStats = {
  wins: number;
  losses: number;
  draws: number;
  score: number;
};

type Results = {
  [name: string]: PlayerStats;
};
const results: Results = {};

const rounds = 500;

for (let i = 1; i <= rounds; i++) {
  // Pick two random players
  const allPlayers: Player[] = bots();
  const [black, white] = allPlayers.sort(() => Math.random() - 0.5);

  // Play game
  const game = new ChessGame(white, black);
  const winner: Player | null = game.play();

  // Initialize player results
  if (!(black.name in results)) {
    results[black.name] = { wins: 0, losses: 0, draws: 0, score: 0 };
  }
  if (!(white.name in results)) {
    results[white.name] = { wins: 0, losses: 0, draws: 0, score: 0 };
  }

  // Update results
  if (winner === black) {
    results[black.name].wins++;
    results[white.name].losses++;
  } else if (winner === white) {
    results[white.name].wins++;
    results[black.name].losses++;
  } else {
    results[black.name].draws++;
    results[white.name].draws++;
  }

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
    Object.entries(results).sort((a, b) => b[1].score - a[1].score),
  );

  // Display scores
  console.log("Round #" + i);
  console.log(highscore);
}
