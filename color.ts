/** Display all pieces on black and white board squares */

const symbols = " ♜ ♞ ♝ ♛ ♚ ♟ ♖ ♘ ♗ ♕ ♔ ♙ ░█";

const RESET = "\x1b[0m";
const FG_WHITE = "\x1b[38;5;15m";
const FG_BLACK = "\x1b[38;5;0m";
const BG_WHITE = "\x1b[48;5;223m";
const BG_BLACK = "\x1b[48;5;94m";

console.log(`${BG_WHITE}${FG_BLACK}${symbols}${RESET} black on white`);
console.log(`${BG_BLACK}${FG_BLACK}${symbols}${RESET} black on black`);
console.log(`${BG_WHITE}${FG_WHITE}${symbols}${RESET} white on white`);
console.log(`${BG_BLACK}${FG_WHITE}${symbols}${RESET} white on black`);
