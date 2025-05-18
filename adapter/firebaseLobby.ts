import { ILobbyService } from '@/services/lobby/ILobbyService';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '@/utils/firebase/config';

export const firebaseLobby: ILobbyService = {
  async create(roomCode, playerName) {
    const roomRef = doc(collection(db, 'rooms'), roomCode);
    const snapshot = await getDoc(roomRef);

    if (snapshot.exists()) {
      throw new Error('Room already exists');
    }

    await setDoc(roomRef, {
      createdAt: Date.now(),
      players: [playerName],
    });
  },

  async join(roomCode, playerName) {
    const roomRef = doc(collection(db, 'rooms'), roomCode);
    const snapshot = await getDoc(roomRef);

    if (!snapshot.exists()) {
      throw new Error('Room does not exist');
    }

    const data = snapshot.data();
    const players = data?.players || [];

    if (players) {
      if (players.length >= 2) {
        throw new Error('Room is full');
      }
    }

    await updateDoc(roomRef, {
      players: arrayUnion(playerName),
    });
  },

  listen(roomCode, callback) {
    const roomRef = doc(collection(db, 'rooms'), roomCode);

    return onSnapshot(roomRef, (docSnap) => {
      const data = docSnap.data();
      const players = data?.players || [];
      callback(players);
    });
  },
};
