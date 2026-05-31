import { checkWinner } from './checkWinner';
import type { Player } from './checkWinner';

function minimax(
  board: Player[],
  depth: number,
  isMaximizing: boolean,
  aiSymbol: 'X' | 'O'
): number {
  const humanSymbol: 'X' | 'O' = aiSymbol === 'X' ? 'O' : 'X';
  const result = checkWinner(board);

  if (result === aiSymbol) return 10 - depth;
  if (result === humanSymbol) return depth - 10;
  if (result === 'draw') return 0;

  const scores: number[] = [];

  for (let i = 0; i < 9; i++) {
    if (board[i] !== null) continue;

    board[i] = isMaximizing ? aiSymbol : humanSymbol;
    scores.push(minimax(board, depth + 1, !isMaximizing, aiSymbol));
    board[i] = null;
  }

  return isMaximizing ? Math.max(...scores) : Math.min(...scores);
}

export function getBestMove(board: Player[], aiSymbol: 'X' | 'O'): number {
  let bestScore = -Infinity;
  let bestIndex = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] !== null) continue;

    board[i] = aiSymbol;
    const score = minimax(board, 0, false, aiSymbol);
    board[i] = null;

    if (score > bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  }

  return bestIndex;
}
