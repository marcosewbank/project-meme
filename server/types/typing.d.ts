export type PlayersT = {
  [key: string]: {
    score: number;
    hand: string[];
    name: string;
  };
};

type PhaseT = "waiting" | "selection" | "vote";
// waiting - Game stopped waiting players to join (first player can decide when start)
// selection - Game is already started, players can read the phrase

export type GameT = {
  phrase: PhaseT;
};
