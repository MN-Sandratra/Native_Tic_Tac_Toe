import { IOnlineGameService } from './IOnlineGameService';
import { firebaseGame } from '@/adapter/firebaseGame';

export const OnlineGameService: IOnlineGameService = firebaseGame;
