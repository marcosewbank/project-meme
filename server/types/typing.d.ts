export type GameT = {
  phase: number;
  phrase: string[];
  deck: CardT[];
  players: PlayersT;
  votingCards: VotedCardT[];
};

export type PlayersT = {
  [key: string]: {
    score: number;
    hand: CardT[];
    name: string;
    ready: number;
    selectedCard?: number;
  };
};

export type CardT = {
  id: string;
  src: string;
  slug?: string;
};

export interface VotedCardT extends CardT {
  votes: string[];
  player: string;
}
