import { GameState } from '@/store/slices/gameSlice';

export interface IOnlineGameService {
  create: (roomCode: string) => Promise<void>;
  update: (roomCode: string, gameState: GameState) => Promise<void>;
  listen: (roomCode: string, callback: (game: GameState) => void) => () => void;
}
