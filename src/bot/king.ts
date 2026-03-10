import {
  BLACK,
  type Chess,
  type Color,
  KING,
  type Move,
  type Square,
  WHITE,
} from "chess.js";
import { Player } from "../player.ts";
import { distance, nameToIndex, type SquareIndex } from "./helpers.ts";

/** Approach opponent king */
export class King extends Player {
  name = "King";
  rank = (move: Move, game: Chess): number => {
    const opponent: Color = game.turn() === "w" ? BLACK : WHITE;

    // const locations: Indices = pieces(opponent, chess);
    const square: Square[] = game.findPiece({ type: KING, color: opponent });
    if (square.length != 1) throw new Error("King not found");
    const kingSquare: SquareIndex = nameToIndex(square[0]);

    const distanceBefore: number = distance(
      nameToIndex(move.from),
      kingSquare,
    );
    const distanceAfter: number = distance(nameToIndex(move.to), kingSquare);
    const improvement: number = distanceBefore / distanceAfter;
    return improvement;
  };
}
