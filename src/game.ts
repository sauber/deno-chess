import { Chess, Move } from "chess.js";
import type { Player } from "./player.ts";

/** CallBack type after moved */
export type Callback = (chess: Chess, white: Player, black: Player) => void;

/** Run a single game with two players and declare a winner */
export class ChessGame {
  /** Core chess enginer */
  public readonly chess: Chess;

  /** Delay between moves */
  private readonly delay = 150;

  /** Call-back after each move */
  public readonly afterMove: Callback = (): void => {};

  /** Max count of moves */
  // private readonly max: number = Infinity;

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
    const [player, opponent]: [Player, Player] = c.turn() === "w"
      ? [this.white, this.black]
      : [this.black, this.white];
    const move: Move = player.move(moves, c, opponent);
    c.move(move);
    this.afterMove(c, this.white, this.black);
    return true;
  }

  public play(max: number = Infinity): Player | null {
    const c = this.chess;
    let iteration = 0;
    while (
      !c.isGameOver() && iteration++ < max && this.turn()
    ) {
      // await new Promise((resolve) => setTimeout(resolve, this.delay));
    }

    // Game is not finished?
    if (!c.isGameOver()) return null;

    // Game is a draw with no winners?
    if (c.isDraw()) return null;

    // Identify a winner
    const winner: Player = c.turn() === "w" ? this.black : this.white;
    return winner;
  }
}
