export type Lang = 'fr' | 'en';

type Translations = {
  selectMode: string;
  localMultiplayer: string;
  localSubtitle: string;
  onlineMultiplayer: string;
  onlineSubtitle: string;
  vsAI: string;
  vsAISubtitle: string;
  player1Setup: string;
  player2Setup: string;
  player1: string;
  yourName: string;
  namePlaceholder: string;
  yourSymbol: string;
  startGame: string;
  nextPlayer: string;
  onlineLobby: string;
  nameLobbyPlaceholder: string;
  roomCodePlaceholder: string;
  create: string;
  or: string;
  join: string;
  roomCode: string;
  playersInLobby: string;
  waiting: string;
  startGameBtn: string;
  draw: string;
  victory: string;
  turn: string;
  wins: string;
  playAgain: string;
  menu: string;
  exitTitle: string;
  exitBody: string;
  cancel: string;
  quit: string;
  vs: string;
  language: string;
  settings: string;
};

export const translations: Record<Lang, Translations> = {
  en: {
    selectMode: 'Select mode',
    localMultiplayer: 'Local multiplayer',
    localSubtitle: 'Play with a friend',
    onlineMultiplayer: 'Online multiplayer',
    onlineSubtitle: 'Invite or join a remote match',
    vsAI: 'VS AI',
    vsAISubtitle: 'Challenge the computer',
    player1Setup: 'Player 1 setup',
    player2Setup: 'Player 2 setup',
    player1: 'Player 1',
    yourName: 'Your name',
    namePlaceholder: 'Enter your name',
    yourSymbol: 'Your symbol',
    startGame: 'Start game',
    nextPlayer: 'Next player',
    onlineLobby: 'Online lobby',
    nameLobbyPlaceholder: 'Your name',
    roomCodePlaceholder: 'Room code',
    create: 'Create',
    or: 'or',
    join: 'Join',
    roomCode: 'Room code',
    playersInLobby: 'Players in lobby',
    waiting: 'Waiting for another player...',
    startGameBtn: 'Start game',
    draw: "It's a draw!",
    victory: 'Victory!',
    turn: "{name}'s turn",
    wins: '{name} wins!',
    playAgain: 'Play again',
    menu: 'Menu',
    exitTitle: 'Leave game?',
    exitBody: 'Do you really want to quit? The game will be lost.',
    cancel: 'Cancel',
    quit: 'Quit',
    vs: 'vs',
    language: 'Language',
    settings: 'Settings',
  },
  fr: {
    selectMode: 'Choisir un mode',
    localMultiplayer: 'Multijoueur local',
    localSubtitle: 'Jouer avec un ami',
    onlineMultiplayer: 'Multijoueur en ligne',
    onlineSubtitle: 'Inviter ou rejoindre une partie',
    vsAI: 'VS IA',
    vsAISubtitle: "Affronter l'ordinateur",
    player1Setup: 'Configuration joueur 1',
    player2Setup: 'Configuration joueur 2',
    player1: 'Joueur 1',
    yourName: 'Votre nom',
    namePlaceholder: 'Entrez votre nom',
    yourSymbol: 'Votre symbole',
    startGame: 'Commencer',
    nextPlayer: 'Joueur suivant',
    onlineLobby: 'Lobby en ligne',
    nameLobbyPlaceholder: 'Votre nom',
    roomCodePlaceholder: 'Code de salle',
    create: 'Créer',
    or: 'ou',
    join: 'Rejoindre',
    roomCode: 'Code de salle',
    playersInLobby: 'Joueurs dans le lobby',
    waiting: "En attente d'un autre joueur...",
    startGameBtn: 'Lancer la partie',
    draw: 'Égalité !',
    victory: 'Victoire !',
    turn: 'Tour de {name}',
    wins: '{name} gagne !',
    playAgain: 'Rejouer',
    menu: 'Menu',
    exitTitle: 'Quitter la partie ?',
    exitBody: 'Voulez-vous vraiment quitter ? La partie sera perdue.',
    cancel: 'Annuler',
    quit: 'Quitter',
    vs: 'vs',
    language: 'Langue',
    settings: 'Paramètres',
  },
};

export function interpolate(str: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce((s, [k, v]) => s.replace(`{${k}}`, v), str);
}
