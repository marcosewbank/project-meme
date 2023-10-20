"use client";
import NoSSR from "react-no-ssr";

import { useSocketContext } from "../context";

import { Login, Scoreboard, Card } from "../components";
import { playerReady } from "../context/emit";

const Page = () => {
  const { id, gameData } = useSocketContext();

  const player = gameData?.players[id];
  console.log("🚀 ~ file: page.tsx:14 ~ Page ~ player:", player);
  const playerAlreadyVoted = gameData?.votingCards.find((card: any) =>
    card.votes.includes(id)
  );

  const sortPlayedCardsByVotes = [...gameData?.votingCards]?.sort(
    (cardA: any, cardB: any) => cardB?.votes?.length - cardA?.votes?.length
  );

  const playedCards =
    gameData?.phase === 2 ? sortPlayedCardsByVotes : gameData?.votingCards;

  return (
    <main className="relative">
      <div className="flex flex-row w-full min-h-screen p-4 max-w-4xl m-auto">
        <NoSSR>
          {player ? (
            <section className="">
              <article className="flex flex-col gap-8">
                <h1 className="text-5xl font-bold">{gameData?.phrase[0]}</h1>

                <div className="flex justify-center items-center rounded-box gap-2">
                  {playedCards.map((card: any, index: number) => {
                    return (
                      <Card
                        key={card.id}
                        card={{ ...card, index }}
                        disabled={id === card?.player || playerAlreadyVoted}
                      />
                    );
                  })}
                </div>

                {gameData?.phase === 2 && player?.ready === gameData?.phase ? (
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

              <Scoreboard
                players={gameData?.players}
                playerId={id}
                phase={gameData.phase}
              />

              <div
                className={`fixed inset-x-0  flex flex-col justify-center p-4 ${
                  gameData.phase !== 0
                    ? "-bottom-48 hover:bottom-10 transition-all ease-out duration-300"
                    : "bottom-10"
                }`}
              >
                <div className="flex justify-center items-center rounded-box gap-2">
                  {player?.hand?.map((card: any, index: number) => {
                    return (
                      <Card
                        key={card.id}
                        card={{ ...card, index }}
                        disabled={gameData.phase !== 0}
                      />
                    );
                  })}
                </div>
              </div>
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
