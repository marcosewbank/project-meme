export type GameT = {
  phase: number;
  // 0 = "waiting" | 1 = "selection" | 2 = "vote" | 3 = "result"
  phrase: string[];
  deck: CardT[];
  players: PlayersT;
  votingCards: CardT[];
};

export type PlayersT = {
  [key: string]: {
    score: number;
    hand: CardT[];
    name: string;
    ready: boolean;
    selectedCard?: number;
  };
};

export type CardT = {
  id: string;
  src: string;
  slug?: string;
};
