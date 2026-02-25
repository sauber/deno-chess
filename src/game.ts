import type { Board } from "./board.ts";
import type { Move } from "./moves.ts";
import type { Player } from "./player.ts";
import type { Piece } from "./rules.ts";

/** Run a game where player takes turn moving a piece until one player is defeated */
export class Game {
  // Number of moves played
  public moves = 0;

  constructor(
    private readonly board: Board,
    private readonly player1: Player,
    private readonly player2: Player,
  ) {}

  private displayMove(
    player: Player,
    piece: Piece,
    move: Move,
  ): void {
    const [source, target] = move;
    console.log(
      "#",
      this.moves,
      player.color,
      "moves",
      piece.name,
      source.name,
      "->",
      target.name,
    );
  }

  // Make a move for one player
  private move(player: Player): boolean {
    const move: Move | undefined = player.move(this.board);
    if (!move) return false;

    this.moves++;
    this.displayMove(player, move[0].piece!, move);
    this.board.move(move[0], move[1]);
    return true;
  }

  /** Start game and run until end */
  public play(max: number = 100): void {
    while (this.moves < max) {
      const player = this.moves % 2 === 1 ? this.player2 : this.player1;
      if (!this.move(player)) break;
      // else console.log(this.board.toString());
    }
  }
}
