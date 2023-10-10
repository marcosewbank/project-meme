import React from "react";
import { PlayersT } from "../../types/typing";

type Props = {
  players: PlayersT;
  playerId: string;
};

const index = ({ players, playerId }: Props) => {
  return (
    <section className="overflow-x-auto bg-base-200 rounded-md pt-2 pb-4 px-4 w-fit absolute right-8 top-8">
      <h2 className="flex justify-center opacity-75 b">Scoreboard</h2>
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(players)?.map((playerArray, index) => {
            const { name, ready, score } = playerArray;

            const isPlayerReady = ready ? "b" : "";
            const currentPlayer =
              players[playerId]?.name === name ? "text-slate-50" : "";

            return (
              <tr
                key={`${name}-${index}`}
                className={`${currentPlayer} ${isPlayerReady} `}
              >
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default index;
