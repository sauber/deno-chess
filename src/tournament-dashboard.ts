import { Table } from "@sauber/table";
import type { PlayerStats, Results } from "./tournament-engine.ts";

export function tournamentDashboard(results: Results, _round: number): string {
  // Reorder players from highest elo to lowest
  const highscore: Record<string, PlayerStats> = Object.fromEntries(
    Object.entries(results).sort((a, b) => b[1].elo - a[1].elo),
  );

  // Create a table with data
  const table = new Table();
  table.title = "Standings";
  table.headers = ["#", "Bot", "Wins", "Draws", "Losses", "Elo", "Time(ms)"];
  table.rows = Object.entries(highscore).map((
    [name, stats],
    index,
  ) => [
    index + 1,
    name,
    stats.wins,
    stats.draws,
    stats.losses,
    stats.elo,
    Math.round(stats.time),
  ]);
  return table.toString();
}
