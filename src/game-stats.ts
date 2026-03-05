import type { Chess } from "chess.js";
import type { Player } from "./player.ts";

/** Display game meta data. Template:
 * (Winner:) White Name - White Score
 * Recent Move
 *
 * Moves: Count
 * End Reason:
 *
 * Recent Move
 * (Winner:) Black Name - Black Score
 */

export function gameStats(chess: Chess, white: Player, black: Player): string {
  const lines: string[] = Array(9).fill("");
  // const gameOver: boolean = chess.isGameOver();

  // Identify reason for Game Over
  let reason: string = "Playing";
  if (chess.isGameOver()) {
    const isDraw: boolean = chess.isDraw();
    const winner: Player | null = !isDraw
      ? (chess.turn() === "w" ? black : white)
      : null;
    if (winner) reason = winner.name + " won";
    else {
      if (chess.isStalemate()) reason = "Stalemate";
      if (chess.isDrawByFiftyMoves()) reason = "Draw By 50 Moves";
      if (chess.isInsufficientMaterial()) reason = "Insufficient Material";
      if (chess.isThreefoldRepetition()) reason = "Threefold Repetition";
    }
  }

  lines[0] = black.name;
  lines[1] = "Moves: " + chess.history().length;
  lines[2] = "Result: " + reason;

  lines[7] = white.name;
  return lines.join("\n");
}
