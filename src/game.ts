import { Chess } from "chess.js";
import type { Player } from "./types.ts";

/** CallBack type after moved */
export type Status = (chess: Chess) => void;

/** Run a single game with two players and declare a winner */
export class ChessGame {
  /** Core chess enginer */
  public readonly chess: Chess;

  /** Delay between moves */
  private readonly delay = 150;

  /** Call-back after each move */
  private readonly afterMove: Status = (): void => {};

  /** Max count of moves */
  private readonly max: number = Infinity;

  constructor(
    public readonly white: Player,
    public readonly black: Player,
    options: Partial<ChessGame> = {},
  ) {
    Object.assign(this, options);
    this.chess = new Chess();
  }

  // Make one move on board
  private turn(): boolean {
    const c = this.chess;

    // Identify legal moves
    const moves = c.moves({ verbose: true });
    if (moves.length === 0) return false;

    // Let player decide move
    const player = c.turn() === "w" ? this.white : this.black;
    const moveIndex = player.move(moves, c);
    const move = moves[moveIndex];
    c.move(move);
    this.afterMove(c);
    return true;
  }

  public play(): Player | null {
    const c = this.chess;
    while (!c.isGameOver() && c.history().length < this.max && this.turn()) {
      // await new Promise((resolve) => setTimeout(resolve, this.delay));
    }

    // Game is a draw with no winners?

    if (c.isDraw()) return null;

    // Identify a winner
    const winner: Player = c.turn() === "w" ? this.black : this.white;
    return winner;
  }
}
