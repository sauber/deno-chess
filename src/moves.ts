import type { Board } from "./board.ts";
import { isCheck } from "./check.ts";
import type { Color, Piece, Vector } from "./rules.ts";
import type { Square } from "./square.ts";

// A move is from one square to another
export type Move = [Square, Square];
export type Moves = Move[];

/** Can piece move to target square */
function canMove(piece: Piece, target: Square): boolean {
  if (target.piece) {
    // Can capture if piece is of other color
    if (target.piece.color !== piece.color) return true;
    // Cannot move if piece is of same color
    else return false;
  } // Can move if there are no other pieces
  else return true;
}

/** Examine one step in one direction */
function step(
  piece: Piece,
  square: Square,
  vector: Vector,
  board: Board,
): Move | undefined {
  const target: Square | undefined = board.target(square, vector);
  if (target && canMove(piece, target)) return [square, target];
  else return undefined;
}

/** Recursive steps in same direction */
function recursive(
  piece: Piece,
  square: Square,
  vector: Vector,
  board: Board,
): Moves {
  const moves: Moves = [];
  let move: Move | undefined = step(piece, square, vector, board);
  while (move) {
    moves.push(move);
    // Stop if there is a piece on target square
    if (move[1].piece) move = undefined;
    else move = step(piece, move[1], vector, board);
  }
  return moves;
}

/** For a piece on a board generate list of valid moves */
export function pieceMoves(
  piece: Piece,
  square: Square,
  board: Board,
): Moves {
  const moves: Moves = [];
  for (const vector of piece.movements) {
    if (piece.slide) moves.push(...recursive(piece, square, vector, board));
    else {
      const move = step(piece, square, vector, board);
      if (move) moves.push(move);
    }
  }
  return moves;
}

/** All valid moves for a player */
export function playerMoves(color: Color, board: Board): Moves {
  // Find pieces on squares belonging to player
  const squares: Square[] = board.pieces(color);

  // List of all possible moves for player
  const moves: Move[] = [];
  for (const square of squares) {
    if (square.piece) {
      moves.push(...pieceMoves(square.piece, square, board));
    }
  }

  return moves;
}

/** Filter moves to exclude those that result in the player's king being in check */
export function legalMoves(
  piece: Piece,
  square: Square,
  board: Board,
): Moves {
  const moves = pieceMoves(piece, square, board);
  return moves.filter((move) => {
    // Simulate the move on a new board
    const newBoard = board.move(move[0], move[1]);

    // The move is legal if the player is not in check on the new board
    const inCheck = isCheck(piece.color, newBoard);

    return !inCheck;
  });
}
