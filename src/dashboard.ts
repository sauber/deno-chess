import type { Board } from "./board.ts";
import type { Game } from "./game.ts";
import type { Move } from "./moves.ts";
import type { Player } from "./player.ts";
import type { Color, File, Piece, Rank, Square } from "./rules.ts";

/** Render the board as a string for display on an ansi terminal */
export function renderBoard(board: Board): string {
  let str = "";
  // Ranks are 0-7, but displayed as 1-8
  for (let rank_idx = 7; rank_idx >= 0; rank_idx--) {
    str += `${rank_idx + 1} `;
    // Files are 0-7, displayed as a-h
    for (let file_idx = 0; file_idx <= 7; file_idx++) {
      const square: Square = { rank: rank_idx as Rank, file: file_idx as File };
      const piece = board.piece(square);

      const squareColor: Color = (rank_idx + file_idx) % 2 === 0
        ? "black"
        : "white";

      const isLatest = board.latest &&
        ((board.latest.source.file === file_idx &&
          board.latest.source.rank === rank_idx) ||
          (board.latest.target.file === file_idx &&
            board.latest.target.rank === rank_idx));
      let bg;
      if (isLatest) {
        // Accented colors for the latest move
        bg = squareColor === "white"
          ? "\x1b[48;5;228m" // Light Yellow
          : "\x1b[48;5;130m"; // Dark Orange
      } else {
        bg = squareColor === "white" ? "\x1b[48;5;230m" : "\x1b[48;5;94m";
      }
      const fg = piece?.color === "white" ? "\x1b[30m" : "\x1b[37m";
      const pieceSymbol = piece ? piece.symbol : " ";
      str += `${bg}${fg} ${pieceSymbol} \x1b[0m`;
    }
    str += "\n";
  }
  str += "   a  b  c  d  e  f  g  h \n";
  return str;
}

/** Display statistics from board such as:
 * List of captured pieces
 * Names of player policies
 * Number of moves since start
 * For each player sum of values for remaining pieces on board
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
  const { source, target } = move;
  console.log(
    "#",
    moveNumber,
    player.color,
    "moves",
    piece.name,
    source.file,
    source.rank,
    "->",
    target.file,
    target.rank,
  );
}

/** Show game status. Side by side display:
 * To the left show board.
 * To the righ show games stats
 */
export function displayGame(game: Game): string {
  const stats = renderGameStats(game);
  const board = renderBoard(game.board);
  console.clear();

  // Render board and stats side by side
  const boardLines: string[] = board.split("\n");
  const statsLines: string[] = stats.split("\n");
  const joined = [];
  for (let i = 0; i < Math.max(boardLines.length, statsLines.length); i++) {
    const boardLine = boardLines[i] || "";
    const statsLine = statsLines[i] || "";
    joined.push(`${boardLine}  ${statsLine}`);
  }
  return joined.join("\n");
}
