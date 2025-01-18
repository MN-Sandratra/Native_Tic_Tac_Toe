import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Player = 'X' | 'O' | null;

interface GameState {
  board: Player[];
  currentPlayer: Player;
  winner: Player;
  gameMode: 'solo' | 'multiplayer';
  isGameOver: boolean;
}

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  gameMode: 'multiplayer',
  isGameOver: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (state, action: PayloadAction<number>) => {
      if (!state.board[action.payload] && !state.isGameOver) {
        state.board[action.payload] = state.currentPlayer;
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      }
    },
    setGameMode: (state, action: PayloadAction<'solo' | 'multiplayer'>) => {
      state.gameMode = action.payload;
    },
    resetGame: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = 'X';
      state.winner = null;
      state.isGameOver = false;
    },
    setWinner: (state, action: PayloadAction<Player>) => {
      state.winner = action.payload;
      state.isGameOver = true;
    }
  },
});

export const { makeMove, setGameMode, resetGame, setWinner } = gameSlice.actions;
export default gameSlice.reducer; 