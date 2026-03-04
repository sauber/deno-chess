import type { Color } from "./types.ts";
import type { Symbol } from "./piece.ts";

interface PieceInfo {
  symbol: Symbol;
  color: Color;
}

const pieceMap: { [key: string]: PieceInfo } = {
  "p": { symbol: "♟", color: "black" },
  "r": { symbol: "♜", color: "black" },
  "n": { symbol: "♞", color: "black" },
  "b": { symbol: "♝", color: "black" },
  "q": { symbol: "♛", color: "black" },
  "k": { symbol: "♚", color: "black" },
  "P": { symbol: "♙", color: "white" },
  "R": { symbol: "♖", color: "white" },
  "N": { symbol: "♘", color: "white" },
  "B": { symbol: "♗", color: "white" },
  "Q": { symbol: "♕", color: "white" },
  "K": { symbol: "♔", color: "white" },
};

const HIGHLICGHT_COLOR = "\x1b[48;5;130m";
const CHECK_COLOR = "\x1b[48;5;1m";
const RESET_COLOR = "\x1b[0m";

/** Given a FEN string, render chess board in ANSI color using UTF8 chess symbols
 * @param fen FEN encoded string of positions
 * @param highlight List of square names to highlight as recently moved
 * @param atatck List of square names to highlight as being in check
 */
export function ansiBoard(
  fen: string,
  highlight: string[] = [],
  attack: string[] = [],
): string {
  // Blank board
  const fenBoard = fen.split(" ")[0];
  const board: (PieceInfo | null)[][] = Array(8).fill(null).map(() =>
    Array(8).fill(null)
  );

  // Place pieces
  const ranks = fenBoard.split("/");
  for (let i = 0; i < ranks.length; i++) {
    const rankStr = ranks[i];
    const rankIndex = 7 - i; // FEN ranks are 8..1, array is 0..7
    let fileIndex = 0;
    for (const char of rankStr) {
      if (fileIndex > 7) break;
      const num = parseInt(char, 10);
      if (isNaN(num)) { // It's a piece
        if (char in pieceMap) {
          board[rankIndex][fileIndex] = pieceMap[char];
        }
        fileIndex++;
      } else { // It's a number (empty squares)
        fileIndex += num;
      }
    }
  }

  let output = "";
  for (let rankIndex = 7; rankIndex >= 0; rankIndex--) {
    output += `${rankIndex + 1} `;
    for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
      const squarename: string = String.fromCharCode(97 + fileIndex) +
        (rankIndex + 1);
      const isHighlight: boolean = highlight.includes(squarename);
      const isAttack: boolean = attack.includes(squarename);
      const pieceInfo: PieceInfo | null = board[rankIndex][fileIndex];
      const isLightSquare: boolean = (rankIndex + fileIndex) % 2 !== 0;
      const fill: string = isLightSquare ? " " : "░";
      const pieceSymbol: string = pieceInfo ? pieceInfo.symbol : " ";
      const chars: string = pieceInfo ? ` ${pieceSymbol} ` : fill.repeat(3);
      const [bg, reset] = isAttack
        ? [CHECK_COLOR, RESET_COLOR]
        : isHighlight
        ? [HIGHLICGHT_COLOR, RESET_COLOR]
        : ["", ""];
      output += bg + chars + reset;
    }
    output += "\n";
  }
  output += "   a  b  c  d  e  f  g  h ";
  return output;
}
