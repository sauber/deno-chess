import { Board } from "./src/board.ts";
import { Game, type Status } from "./src/game.ts";
import { Player } from "./src/player.ts";
import { RandomPolicy } from "./src/policy.ts";
import { BlackKing, WhiteKing } from "./src/rules.ts";
import { displayGame } from "./src/dashboard.ts";

// Create a board with kings in each corner
const board = new Board()
  .place(WhiteKing, "a", 1)
  .place(WhiteKing, "h", 1)
  .place(BlackKing, "a", 8)
  .place(BlackKing, "h", 8);

// Create two players
const player1 = new Player("white", RandomPolicy);
const player2 = new Player("black", RandomPolicy);

// Create a callback for displaying game status
const display: Status = (game: Game): Promise<void> => {
  const output: string = displayGame(game);
  console.log(output);
  // Sleep 200 ms
  return new Promise((resolve) => setTimeout(resolve, 200));
};

// Setup game
const game = new Game(board, player1, player2, { status: display, max: 10 });
// display(game);

// Run game
await game.play();
