import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST } from 'redux-persist';
import { middleware } from '@/store/store.middleware';
import playerSlice from './slices/playerSlice';
import gameSlice from './slices/gameSlice';
import lobbySlice from './slices/lobbySlice';

export const store = configureStore({
  reducer: {
    players: playerSlice,
    game: gameSlice,
    lobby: lobbySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
