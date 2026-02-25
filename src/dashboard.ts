import type { Board } from "./board.ts";
import { Game } from "./game.ts";
import type { Move } from "./moves.ts";
import type { Player } from "./player.ts";
import type { Piece } from "./rules.ts";

/** Render the board as a string for display on an ansi terminal */
export function renderBoard(board: Board): string {
  let str = "";
  for (let i = 7; i >= 0; i--) {
    str += `${i + 1} `;
    for (const square of board.grid[i]) {
      const piece = square.piece ? square.piece.symbol : " ";
      const isLatest = board.latest &&
        (board.latest[0] === square || board.latest[1] === square);
      let bg;
      if (isLatest) {
        // Accented colors for the latest move
        bg = square.color === "white"
          ? "\x1b[48;5;228m" // Light Yellow
          : "\x1b[48;5;130m"; // Dark Orange
      } else {
        bg = square.color === "white" ? "\x1b[48;5;230m" : "\x1b[48;5;94m";
      }
      const fg = square.piece?.color === "white" ? "\x1b[30m" : "\x1b[37m";
      // const fg = "";
      str += `${bg}${fg} ${piece} \x1b[0m`;
    }
    str += "\n";
  }
  str += "   a  b  c  d  e  f  g  h \n";
  return str;
}

/** Display statics from board such as:
 * List of captured pieces
 * Names of player policies
 * Number of moves since start
 */
export function renderGameStats(game: Game): string {
  // const whiteCaptured = game.board.whiteCaptured.map((p) => p.symbol).join(" ");
  // const blackCaptured = game.board.blackCaptured.map((p) => p.symbol).join(" ");

  const stats = [
    `Moves: ${game.moves}`,
    `White: ${game.player1.policy.name}`,
    `Black: ${game.player2.policy.name}`,
    // `Captured by White: ${whiteCaptured || "None"}`,
    // `Captured by Black: ${blackCaptured || "None"}`,
  ];

  return stats.join("\n");
}

export function displayMove(
  moveNumber: number,
  player: Player,
  piece: Piece,
  move: Move,
): void {
  const [source, target] = move;
  console.log(
    "#",
    moveNumber,
    player.color,
    "moves",
    piece.name,
    source.name,
    "->",
    target.name,
  );
}
