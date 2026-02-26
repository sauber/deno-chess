import type { Board } from "./board.ts";
import { isCheck } from "./check.ts";
import type { Pieces, Position } from "./pieces.ts";
import type { Color, Piece, Square, Vector } from "./rules.ts";

// A move is from one square to another
export type Move = { source: Position; target: Square };
export type Moves = Move[];

/** Can piece move to target square on board */
function canMove(piece: Piece, target: Square, board: Board): boolean {
  const other: Piece | undefined = board.piece(target);

  // Can move to empty square
  if (!other) return true;

  // Can move to square having piece of other color (and capture it)
  if (other.color !== piece.color) return true;

  // Cannot move to square having piece with same color
  return false;
}

/** Examine one step in one direction */
function step(
  piece: Piece,
  square: Square,
  vector: Vector,
  board: Board,
): Move | undefined {
  const target: Square | undefined = board.target(square, vector);

  // Cannot move outside board
  if (!target) return undefined;

  // Can move to target square
  if (canMove(piece, target, board)) {
    const move: Move = {
      source: { file: square.file, rank: square.rank, piece },
      target,
    };
    return move;
  }

  // Cannot move to square
  return undefined;
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
    if (board.piece(move.target)) move = undefined;
    else move = step(piece, move.target, vector, board);
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
  // const squares: Square[] = board.pieces(color);
  const pieces: Pieces = color === "white" ? board.white : board.black;

  // List of all possible moves for player
  const moves: Move[] = [];
  for (const position of pieces.all) {
    const square: Square = { file: position.file, rank: position.rank };
    moves.push(...legalMoves(position.piece, square, board));
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
    const newBoard = board.move(move);

    // The move is legal if the player is not in check on the new board
    const inCheck = isCheck(piece.color, newBoard);

    return !inCheck;
  });
}
