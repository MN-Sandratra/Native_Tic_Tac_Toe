import type { Player } from './checkWinner';
import type { Difficulty } from '@/store/slices/gameSlice';
import { getBestMove } from './minimax';

function getEmptyCells(board: Player[]): number[] {
  return board.reduce<number[]>((acc, cell, i) => (cell === null ? [...acc, i] : acc), []);
}

function randomMove(board: Player[]): number {
  const empty = getEmptyCells(board);
  return empty[Math.floor(Math.random() * empty.length)];
}

export function getAIMove(board: Player[], aiSymbol: 'X' | 'O', difficulty: Difficulty): number {
  const mutable = [...board];

  if (difficulty === 'easy') return randomMove(mutable);

  if (difficulty === 'medium') {
    return Math.random() < 0.5 ? randomMove(mutable) : getBestMove(mutable, aiSymbol);
  }

  return getBestMove(mutable, aiSymbol);
}
