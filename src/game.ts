import type { Board } from "./board.ts";
import type { Move } from "./moves.ts";
import type { Player } from "./player.ts";
import type { Piece } from "./rules.ts";

export interface MoveHistoryEntry {
  player: Player;
  piece: Piece;
  move: Move;
  capturedPiece?: Piece;
}

/** Callback after each move */
export type Status = (game: Game) => Promise<void>;

/** Run a game where player takes turn moving a piece until one player is defeated */
export class Game {
  /** Journal of moves */
  public readonly history: MoveHistoryEntry[] = [];

  // Max number of moves
  public readonly max: number = 1000;

  // Callback functiom after each move
  public readonly status: Status = (): Promise<void> => {
    return Promise.resolve();
  };

  constructor(
    public board: Board,
    public readonly player1: Player,
    public readonly player2: Player,
    options: Partial<Game> = {},
  ) {
    Object.assign(this, options);
  }

  // Make a move for one player
  private move(player: Player): boolean {
    const move: Move | undefined = player.move(this.board);
    if (!move) return false;

    const [source, target] = move;
    const movedPiece = source.piece!;
    const capturedPiece = target.piece;
    this.history.push({
      player,
      piece: movedPiece,
      move,
      capturedPiece,
    });
    this.board = this.board.move(source, target);
    return true;
  }

  /** Number of moves played  */
  public get moves(): number {
    return this.history.length;
  }

  /** Start game and run until end */
  public async play(): Promise<void> {
    while (this.moves < this.max) {
      const player = this.moves % 2 === 1 ? this.player2 : this.player1;
      if (!this.move(player)) break;
      await this.status(this);
    }
  }
}
