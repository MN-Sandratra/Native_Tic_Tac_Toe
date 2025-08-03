import { checkWinner } from '@/utils/gamesLogic/checkWinner';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Player = 'X' | 'O' | 'draw' | null;

interface GameState {
  board: Player[];
  currentPlayer: Player;
  winner: Player;
  gameMode: 'solo' | 'multiplayer';
  isGameOver: boolean;
}

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: Math.random() < 0.5 ? 'X' : 'O',
  winner: null,
  gameMode: 'multiplayer',
  isGameOver: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.board[index] || state.isGameOver) return;

      state.board[index] = state.currentPlayer;

      const winner = checkWinner(state.board);

      if (winner) {
        state.winner = winner;
        state.isGameOver = true;
      } else {
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      }
    },

    setGameMode: (state, action: PayloadAction<'solo' | 'multiplayer'>) => {
      state.gameMode = action.payload;
    },

    resetGame: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
      state.winner = null;
      state.isGameOver = false;
    },

    setWinner: (state, action: PayloadAction<Player>) => {
      state.winner = action.payload;
      state.isGameOver = true;
    },

    syncWithOnlineGame: (state, action: PayloadAction<GameState>) => {
      return action.payload;
    },
  },
});

export const { makeMove, setGameMode, resetGame, setWinner, syncWithOnlineGame } =
  gameSlice.actions;
export type { GameState };
export default gameSlice.reducer;
