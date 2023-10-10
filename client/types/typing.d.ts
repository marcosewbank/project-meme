export type PlayersT = {
  [key: string]: {
    score: number;
    hand: {
      src: string;
      id: string;
      slug: string;
    }[];
    name: string;
    ready: boolean;
  };
};
