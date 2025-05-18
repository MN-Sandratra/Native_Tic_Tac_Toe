import { firebaseLobby } from '@/adapter/firebaseLobby';
import { ILobbyService } from './ILobbyService';

export const LobbyService: ILobbyService = firebaseLobby;
