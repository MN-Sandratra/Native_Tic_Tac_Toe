import { db } from '@/utils/firebase/config';
import { IOnlineGameService } from '@/services/onlineGame/IOnlineGameService';
import { GameState } from '@/store/slices/gameSlice';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

export const firebaseGame: IOnlineGameService = {
  create: async function (roomCode: string): Promise<void> {
    const gameRef = doc(db, `rooms/${roomCode}`);

    const initialState: GameState = {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      gameMode: 'multiplayer',
      isGameOver: false,
    };

    await setDoc(
      gameRef,
      {
        gameState: initialState,
        gameStarted: true,
      },
      { merge: true }
    );
  },

  update: async function (roomCode: string, gameState: GameState): Promise<void> {
    const gameRef = doc(db, `rooms/${roomCode}`);
    await setDoc(gameRef, { gameState }, { merge: true });
  },

  listen: function (roomCode: string, callback: (game: GameState) => void): () => void {
    const gameRef = doc(db, `rooms/${roomCode}`);

    return onSnapshot(gameRef, (snapshot) => {
      const data = snapshot.data();
      if (data?.gameState) {
        callback(data.gameState as GameState);
      }
    });
  },
};
