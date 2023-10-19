"use client";
import NoSSR from "react-no-ssr";

import { useSocketContext } from "../context";

import { Login, Scoreboard, Card } from "../components";
import { playerReady } from "../context/emit";

const Page = () => {
  const { id, gameData } = useSocketContext();

  const player = gameData?.players[id];
  const playerAlreadyVoted = gameData?.votingCards.find((card: any) =>
    card.votes.includes(id)
  );
  const sortPlayedCardsByVotes = gameData?.votingCards?.sort(
    (cardA: any, cardB: any) => cardB?.votes?.length - cardA?.votes?.length
  );

  return (
    <main className="relative">
      <div className="flex flex-row w-full min-h-screen p-4 max-w-4xl m-auto">
        <NoSSR>
          {player ? (
            <section className="">
              <article className="flex flex-col gap-8">
                <h1 className="text-5xl font-bold">{gameData?.phrase[0]}</h1>

                <div className="flex justify-center items-center rounded-box gap-2">
                  {sortPlayedCardsByVotes.map((card: any, index: number) => {
                    return (
                      <Card
                        key={card.id}
                        card={{ ...card, index }}
                        disabled={id === card?.player || playerAlreadyVoted}
                      />
                    );
                  })}
                </div>

                {gameData.phase === 2 ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      playerReady({ playerId: id });
                    }}
                  >
                    Next round!
                  </button>
                ) : (
                  ""
                )}
              </article>

              <Scoreboard players={gameData?.players} playerId={id} />

              {player?.hand?.length === 5 ? (
                <div
                  className={`fixed inset-x-0 bottom-10 flex flex-col justify-center p-4 ${
                    gameData?.phase !== 0 &&
                    "-bottom-48 hover:bottom-10 transition-all ease-out duration-300"
                  }`}
                >
                  <div className="flex justify-center items-center rounded-box gap-2">
                    {player?.hand?.map((card: any, index: number) => {
                      return (
                        <Card
                          key={card.id}
                          card={{ ...card, index }}
                          disabled={gameData?.phase !== 0}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
            </section>
          ) : (
            <Login />
          )}
        </NoSSR>
      </div>
    </main>
  );
};

export default Page;
