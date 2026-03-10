import {
  BLACK,
  type Chess,
  type Color,
  KING,
  type Move,
  type PieceSymbol,
  WHITE,
} from "chess.js";
import { Player } from "../player.ts";
import {
  indexToName,
  pieces,
  pieceValue,
  type SquareIndex,
} from "./helpers.ts";
import type { Moves } from "../types.ts";

/** Value of piece on square */
const squareValue = (board: Chess, square: SquareIndex): number => {
  const piece: PieceSymbol = board.get(indexToName(square))
    ?.type as PieceSymbol;
  if (piece === KING) return 1;
  return pieceValue[piece];
};

/** Sum of values of all pieces belonging to player, except king */
const boardValue = (board: Chess, color: Color): number =>
  pieces(color, board).map((square: SquareIndex) => squareValue(board, square))
    .reduce((a, b) => a + b, 0) - 1000;

/** Sum of values of all opponent pieces that are attacked */
const attackValue = (board: Chess, color: Color): number =>
  pieces(color === WHITE ? BLACK : WHITE, board).map((
    square: SquareIndex,
  ) =>
    board.attackers(indexToName(square), color).length > 0
      ? squareValue(board, square)
      : 0
  ).reduce((a, b) => a + b, 0);

/** Count of possible moves */
const mobilityValue = (board: Chess, color: Color): number =>
  pieces(color, board).map((square: SquareIndex) =>
    board.moves({ square: indexToName(square) }).length
  ).reduce((a, b) => a + b, 0);

/** Calculate board score of move */
export class Score extends Player {
  name = "Score";
  rank = (move: Move, game: Chess, _moves: Moves, _index: number): number => {
    const [player, opponent]: [Color, Color] = game.turn() === WHITE
      ? [WHITE, BLACK]
      : [BLACK, WHITE];

    // Capture opponent
    let score = move.captured ? pieceValue[move.captured] / 2 : 0;

    // Promotion
    score += move.promotion ? pieceValue[move.promotion] : 0;

    game.move(move);
    score += boardValue(game, player) +
      attackValue(game, player) +
      0.1 * mobilityValue(game, player) -
      boardValue(game, opponent) -
      attackValue(game, opponent) -
      0.1 * mobilityValue(game, opponent);
    game.undo();
    return score;
  };
}
