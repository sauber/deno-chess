import { Chess } from "chess.js";
import { ansiBoard } from "./src/ansi-board.ts";

const chess = new Chess();
const HIDE_CURSOR = "\x1b[?25l";
const SHOW_CURSOR = "\x1b[?25h";
const CLEAR_LINE = "\x1b[K";
console.log(HIDE_CURSOR);

while (!chess.isGameOver() && chess.history().length < 500) {
  const moves = chess.moves();
  const move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);
  // If not the first move, move up curser 9 lines
  if (chess.history().length > 1) {
    console.log("\x1b[12A");
  }
  // console.log(chess.ascii());
  const fen = chess.fen();
  const board = ansiBoard(fen).split("\n");

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
}
console.log(SHOW_CURSOR);

// console.log(chess.pgn());

// const RESET = "\x1b[0m";
// const FG_BLACK = "\x1b[38;5;0m";
// // const FG_WHITE = "\x1b[38;5;15m";
// const FG_WHITE = "\x1b[38;2;255;255;255m";
// // const BG_LIGHT_SQUARE = "\x1b[48;5;223m"; // Beige background
// const BG_LIGHT_SQUARE = "\x1b[48;5;217m"; // Beige background
// const BG_DARK_SQUARE = "\x1b[48;5;94m"; // Dark brown background

// let output = `${BG_LIGHT_SQUARE}${FG_BLACK}X${RESET}\n`;
// output += `${BG_DARK_SQUARE}${FG_BLACK}X${RESET}\n`;
// output += `${BG_LIGHT_SQUARE}${FG_WHITE}X${RESET}\n`;
// output += `${BG_DARK_SQUARE}${FG_WHITE}X${RESET}\n`;

// console.log(output);
// console.log("\x1b[38;2;255;82;197;48;2;155;106;0mHello" + RESET);
