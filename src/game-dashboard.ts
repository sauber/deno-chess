import { type Chess, KING, type Move, type Square } from "chess.js";
import { ansiBoard } from "./ansi-board.ts";
import { gameStats } from "./game-stats.ts";
import type { Player } from "./player.ts";

// Ansi code for clearing rest of line
const CLEAR_LINE = "\x1b[K";

/** Display pieces on board and game meta stats side by side */
export function gameDashboard(
  game: Chess,
  white: Player,
  black: Player,
): string {
  // Most recent player
  const player = game.turn() === "w" ? black : white;

  // Move of most recent player:
  const last: Move | undefined = player.last;
  const highlight = last ? [last.from, last.to] : [];

  // Player is in check
  const attack: string[] = [];
  const check: boolean = game.inCheck();
  if (check) {
    // On which square is king located
    const kingSquare: Square =
      game.findPiece({ type: KING, color: game.turn() })[0];
    attack.push(kingSquare);

    // On which squares are attaching pieces located
    const other = game.turn() === "w" ? "b" : "w";
    const attackers = game.attackers(kingSquare, other);
    attack.push(...attackers);
  }

  // Render board
  const board = ansiBoard(game.fen(), highlight, attack);
  const stats = gameStats(game, white, black);

  // Merge lines from outputs
  const boardLines = board.split("\n");
  const statsLines = stats.split("\n");
  const lines: string[] = Array(9).fill("");
  const lineCount = Math.max(boardLines.length, statsLines.length);

  for (let i = 0; i < lineCount; i++) {
    lines[i] = boardLines[i] + " " + statsLines[i] + CLEAR_LINE;
  }

  return lines.join("\n");
}
