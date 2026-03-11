import type { Player } from "./player.ts";
import { type Callback, ChessGame } from "./game.ts";
import type { Chess } from "chess.js";

export type PlayerStats = {
  wins: number;
  draws: number;
  losses: number;
  score: number;
  elo: number;
  time: number;
};

export type Results = {
  [name: string]: PlayerStats;
};

export type TournamentCallback = (results: Results, round: number) => void;

export type TournamentMoveCallback = (
  game: Chess,
  white: Player,
  black: Player,
  results: Results,
  round: number,
) => void;

const K_FACTOR = 32;

export class Tournament {
  private results: Results = {};
  public readonly rounds: number;
  public readonly onRoundComplete: TournamentCallback;
  public readonly onMove: TournamentMoveCallback;

  constructor(
    public readonly players: Player[],
    options: {
      rounds?: number;
      onRoundComplete?: TournamentCallback;
      onMove?: TournamentMoveCallback;
    } = {},
  ) {
    this.rounds = options.rounds ?? 500;
    this.onRoundComplete = options.onRoundComplete ?? (() => {});
    this.onMove = options.onMove ?? (() => {});
    // Reset player time at the start of a tournament
    this.players.forEach((p) => p.time = 0);
  }

  private initializePlayer(player: Player) {
    if (!(player.name in this.results)) {
      this.results[player.name] = {
        wins: 0,
        draws: 0,
        losses: 0,
        score: 0,
        elo: 1200,
        time: 0,
      };
    }
  }

  public run() {
    for (let i = 1; i <= this.rounds; i++) {
      this.playRound(i);
    }
  }

  private playRound(round: number) {
    const [black, white] = this.pickPlayers();
    const afterMove: Callback = (chess, white, black) => {
      this.onMove(chess, white, black, this.results, round);
    };
    const winner = this.playGame(white, black, { afterMove });
    this.updateResults(white, black, winner);
    this.onRoundComplete(this.results, round);
  }

  private pickPlayers(): [Player, Player] {
    const [p1, p2] = [...this.players].sort(() => Math.random() - 0.5);
    return [p1, p2];
  }

  private playGame(
    white: Player,
    black: Player,
    options: Partial<ChessGame> = {},
  ): Player | null {
    const game = new ChessGame(white, black, options);
    return game.play();
  }

  private updateResults(white: Player, black: Player, winner: Player | null) {
    this.initializePlayer(black);
    this.initializePlayer(white);

    this.results[black.name].time = black.time;
    this.results[white.name].time = white.time;

    const { whiteGameScore, blackGameScore } = this.updateWinLossStats(
      white,
      black,
      winner,
    );

    this.updateElo(white, black, whiteGameScore, blackGameScore);
    this.updateFootballScore(white, black);
  }

  private updateWinLossStats(
    white: Player,
    black: Player,
    winner: Player | null,
  ): { whiteGameScore: number; blackGameScore: number } {
    let whiteGameScore: number;
    if (winner === black) {
      this.results[black.name].wins++;
      this.results[white.name].losses++;
      whiteGameScore = 0;
    } else if (winner === white) {
      this.results[white.name].wins++;
      this.results[black.name].losses++;
      whiteGameScore = 1;
    } else {
      this.results[black.name].draws++;
      this.results[white.name].draws++;
      whiteGameScore = 0.5;
    }
    return { whiteGameScore, blackGameScore: 1 - whiteGameScore };
  }

  private updateElo(
    white: Player,
    black: Player,
    whiteGameScore: number,
    blackGameScore: number,
  ) {
    const eloBlack = this.results[black.name].elo;
    const eloWhite = this.results[white.name].elo;

    const expectedWhite = 1 / (1 + 10 ** ((eloBlack - eloWhite) / 400));
    const expectedBlack = 1 - expectedWhite;

    this.results[white.name].elo = Math.round(
      eloWhite + K_FACTOR * (whiteGameScore - expectedWhite),
    );
    this.results[black.name].elo = Math.round(
      eloBlack + K_FACTOR * (blackGameScore - expectedBlack),
    );
  }

  private updateFootballScore(white: Player, black: Player) {
    for (const n of [black.name, white.name]) {
      const stats: PlayerStats = this.results[n];
      const { wins, losses, draws } = stats;
      if (wins + losses + draws > 0) {
        stats.score = parseFloat(
          ((3 * wins + draws) / (wins + draws + losses)).toFixed(2),
        );
      }
    }
  }
}
