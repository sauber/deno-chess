import { Chess, KING, type Square } from "chess.js";
import { ansiBoard } from "./src/ansi-board.ts";

const chess = new Chess();
const HIDE_CURSOR = "\x1b[?25l";
const SHOW_CURSOR = "\x1b[?25h";
const CLEAR_LINE = "\x1b[K";
console.log(HIDE_CURSOR);

while (!chess.isGameOver() && chess.history().length < 500) {
  // Wait between moves
  await new Promise((resolve) => setTimeout(resolve, 150));

  const moves = chess.moves({ verbose: true });
  const move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);

  // After move, the turn color in check?
  const attack: string[] = [];
  if (chess.inCheck()) {
    // On which square is king located
    const kingSquare: Square =
      chess.findPiece({ type: KING, color: chess.turn() })[0];
    attack.push(kingSquare);

    // On which squares are attacking pieces located
    const other = chess.turn() === "w" ? "b" : "w";
    const attackers = chess.attackers(kingSquare, other);
    attack.push(...attackers);
  }

  // If not the first move, move up curser 9 lines
  if (chess.history().length > 1) {
    console.log("\x1b[11A");
  }

  // Render board
  const fen = chess.fen();
  const board = ansiBoard(fen, [move.from, move.to], attack).split("\n");

  const status = [
    "Moves:" + chess.moves().length,
    "Color: " + chess.turn(),
    "Check: " + chess.isCheck(),
    "Checkmate: " + chess.isCheckmate(),
    "Draw: " + chess.isDraw(),
    "Draw By 50 Moves: " + chess.isDrawByFiftyMoves(),
    "Insufficient Material: " + chess.isInsufficientMaterial(),
    "Threefold Repetition: " + chess.isThreefoldRepetition(),
    "Stalemate: " + chess.isStalemate(),
  ];

  // Combine board lines and status lines
  const output = board.map((line, index) => {
    return line + " " + status[index];
  }).join(CLEAR_LINE + "\n");

  console.log("Moves: " + chess.history().length);
  console.log(output);
  // if (chess.inCheck()) Deno.exit(0);
}
console.log(SHOW_CURSOR);
