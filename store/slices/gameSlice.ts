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
      if (state.board[action.payload] || state.isGameOver) {
        return;
      }

      state.board[action.payload] = state.currentPlayer;

      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
          state.board[a] &&
          state.board[a] === state.board[b] &&
          state.board[a] === state.board[c]
        ) {
          state.winner = state.currentPlayer;
          state.isGameOver = true;
          return;
        }
      }

      if (state.board.every((cell) => cell !== null)) {
        state.winner = 'draw';
        state.isGameOver = true;
        return;
      }

      state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
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
