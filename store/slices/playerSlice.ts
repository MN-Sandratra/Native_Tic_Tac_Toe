import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Player {
  name: string;
  symbol: 'X' | 'O';
}

interface PlayersState {
  player1: Player | null;
  player2: Player | null;
  currentTurn: 'X' | 'O';
}

const initialState: PlayersState = {
  player1: null,
  player2: null,
  currentTurn: 'X',
};

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayer: (
      state,
      action: PayloadAction<{ playerNumber: 1 | 2; name: string; symbol: 'X' | 'O' }>
    ) => {
      const { playerNumber, name, symbol } = action.payload;
      if (playerNumber === 1) {
        state.player1 = { name, symbol };
        state.player2 = null; // Reset player 2 when player 1 changes
      } else {
        state.player2 = { name, symbol };
      }
    },
    resetPlayers: (state) => {
      state.player1 = null;
      state.player2 = null;
      state.currentTurn = 'X';
    },
  },
});

export const { setPlayer, resetPlayers } = playerSlice.actions;
export default playerSlice.reducer; 