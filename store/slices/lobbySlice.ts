import { LobbyService } from '@/services/lobby/lobbyService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface LobbyState {
  roomCode: string;
  players: string[];
  localPlayer: string;
  inLobby: boolean;
  error: string | null;
  createLoading: boolean;
  joinLoading: boolean;
}

const initialState: LobbyState = {
  roomCode: '',
  players: [],
  localPlayer: '',
  inLobby: false,
  error: null,
  createLoading: false,
  joinLoading: false,
};

// Create Room
export const createRoom = createAsyncThunk(
  'lobby/createRoom',
  async (playerName: string, { rejectWithValue }) => {
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();

    try {
      await LobbyService.create(code, playerName);
      return { code };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to create room');
    }
  }
);

// Join Room
export const joinRoom = createAsyncThunk(
  'lobby/joinRoom',
  async (
    { roomCode, playerName }: { roomCode: string; playerName: string },
    { rejectWithValue }
  ) => {
    try {
      await LobbyService.join(roomCode, playerName);
      return { roomCode };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to join room');
    }
  }
);

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    leaveRoom: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.createLoading = false;
        state.roomCode = action.payload.code;
        state.inLobby = true;
        state.localPlayer = action.meta.arg;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload as string;
      })

      .addCase(joinRoom.pending, (state) => {
        state.joinLoading = true;
        state.error = null;
      })
      .addCase(joinRoom.fulfilled, (state, action) => {
        state.joinLoading = false;
        state.roomCode = action.payload.roomCode;
        state.inLobby = true;
        state.localPlayer = action.meta.arg.playerName;
      })
      .addCase(joinRoom.rejected, (state, action) => {
        state.joinLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPlayers, leaveRoom } = lobbySlice.actions;
export default lobbySlice.reducer;
