export interface ILobbyService {
  create: (roomCode: string, playerName: string) => Promise<void>;
  join: (roomCode: string, playerName: string) => Promise<void>;
  listen: (roomCode: string, callback: (players: string[]) => void) => void;
}
