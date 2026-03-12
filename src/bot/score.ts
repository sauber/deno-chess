import { BLACK, type Chess, type Color, type Move, WHITE } from "chess.js";
import { Player } from "../player.ts";
import {
  indexToName,
  type Indices,
  pieces,
  pieceValue,
  type SquareIndex,
} from "./helpers.ts";

/** Value of piece on square */
const squareValue = (board: Chess, square: SquareIndex): number => {
  const piece = board.get(indexToName(square));
  return piece ? pieceValue[piece.type] : 0;
};

/** Sum of values of all pieces belonging to player, except king */
const boardValue = (board: Chess, playerPieces: Indices): number =>
  playerPieces.map((square: SquareIndex) => squareValue(board, square))
    .reduce((a, b) => a + b, 0) - 1000;

/** Sum of values of all opponent pieces that are attacked */
const attackValue = (
  board: Chess,
  attackerColor: Color,
  attackedPieces: Indices,
): number =>
  attackedPieces.map((
    square: SquareIndex,
  ) =>
    board.attackers(indexToName(square), attackerColor).length > 0
      ? squareValue(board, square)
      : 0
  ).reduce((a, b) => a + b, 0);

/** Calculate board score of move */
export class Score extends Player {
  name = "Score";
  rank = (move: Move, game: Chess): number => {
    const player: Color = game.turn();
    const opponent: Color = player === WHITE ? BLACK : WHITE;

    // Capture opponent
    let score = move.captured ? pieceValue[move.captured] / 2 : 0;

    // Promotion
    score += move.promotion ? pieceValue[move.promotion] : 0;

    game.move(move);

    const playerPieces = pieces(player, game);
    const opponentPieces = pieces(opponent, game);

    score += boardValue(game, playerPieces) +
      attackValue(game, player, opponentPieces) -
      boardValue(game, opponentPieces) -
      attackValue(game, opponent, playerPieces) -
      0.1 * game.moves().length; // Opponent mobility

    game.undo();
    return score;
  };
}
