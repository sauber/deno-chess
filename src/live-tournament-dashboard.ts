import type { Chess } from "chess.js";
import { gameDashboard } from "./game-dashboard.ts";
import { tournamentDashboard } from "./tournament-dashboard.ts";
import type { Player } from "./player.ts";
import type { Results } from "./tournament-engine.ts";
import { stripAnsiCode } from "@std/fmt/colors";

// Ansi code for clearing rest of line
const CLEAR_LINE = "\x1b[K";

/**
 * Strips ANSI escape codes from a string.
 * @param str The string to strip.
 * @returns The stripped string.
 */
// const stripAnsi = (str: string) =>
//   str.replace(/[\u001b\u009b][[()#;?]*.{0,2}?[0-9]*[a-zA-Z@]/g, "");

export function liveTournamentDashboard(
  game: Chess,
  white: Player,
  black: Player,
  results: Results,
  round: number,
): string {
  const gameOutput = gameDashboard(game, white, black);
  const tournamentOutput = tournamentDashboard(results, round);

  const gameLines = gameOutput.split("\n");
  const gameLineLength = stripAnsiCode(gameLines[0]).length;
  gameLines.unshift(`[ Round #${round}]`.padEnd(gameLineLength));
  const tournamentLines = tournamentOutput.split("\n");

  const combinedLines = [];
  const maxLines = Math.max(gameLines.length, tournamentLines.length);

  // Display blank line instead of game line and tournament line
  const gamePad = " ".repeat(gameLineLength);
  const tournamentPad = " ".repeat(tournamentLines[0].length);

  for (let i = 0; i < maxLines; i++) {
    const gameLine = gameLines[i] || gamePad;
    const tournamentLine = tournamentLines[i] || tournamentPad;
    combinedLines.push(
      gameLine + " " + tournamentLine + CLEAR_LINE,
    );
  }

  return combinedLines.join("\n");
}
