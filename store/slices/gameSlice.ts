import { checkWinner } from '@/utils/gamesLogic/checkWinner';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Player = 'X' | 'O' | 'draw' | null;
type Difficulty = 'easy' | 'medium' | 'hard';
type GameMode = 'solo' | 'multiplayer' | 'ai';

interface GameState {
  board: Player[];
  currentPlayer: Player;
  winner: Player;
  gameMode: GameMode;
  isGameOver: boolean;
  difficulty: Difficulty;
  aiSymbol: 'X' | 'O' | null;
}

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: Math.random() < 0.5 ? 'X' : 'O',
  winner: null,
  gameMode: 'multiplayer',
  isGameOver: false,
  difficulty: 'medium',
  aiSymbol: null,
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

    setGameMode: (state, action: PayloadAction<GameMode>) => {
      state.gameMode = action.payload;
    },

    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
    },

    setAiSymbol: (state, action: PayloadAction<'X' | 'O'>) => {
      state.aiSymbol = action.payload;
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

export const {
  makeMove,
  setGameMode,
  resetGame,
  setWinner,
  syncWithOnlineGame,
  setDifficulty,
  setAiSymbol,
} = gameSlice.actions;
export type { GameState, Difficulty, GameMode };
export default gameSlice.reducer;
