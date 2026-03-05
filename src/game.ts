import { Chess } from "chess.js";

/** CallBack type after moved */
export type Status = (chess: Chess) => void;

/** Player definition */
export type Player = unknown;

/** Run a single game with two players and declare a winner */
export class ChessGame {
  /** Core chess enginer */
  private readonly chess: Chess;

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

  public play() {
    const c = this.chess;
    while (!this.chess.isGameOver() && c.history().length < this.max) {
      // Make a move
      const moves = c.moves({ verbose: true });
      // TODO let player decide move
      const move = moves[Math.floor(Math.random() * moves.length)];
      c.move(move);
    }
  }
}
