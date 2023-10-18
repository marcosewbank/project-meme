"use client";
import NoSSR from "react-no-ssr";

import { playerReady } from "../context/emit";
import { useSocketContext } from "../context";

import { Login, Scoreboard, Card } from "../components";

const Page = () => {
  const { id, gameData, selectedCard } = useSocketContext();

  console.log("🚀 ~ file: page.tsx:11 ~ Page ~ selectedCard:", selectedCard);

  const player = gameData?.players[id];

  console.log("🚀 ~ file: page.tsx:16 ~ Page ~ gameData:", gameData);

  const handleClick = () => {
    playerReady({ playerId: id, selectedCardIndex: selectedCard });
  };

  return (
    <main className="relative">
      <div className="flex flex-row w-full min-h-screen p-4 max-w-4xl m-auto">
        <NoSSR>
          {player ? (
            <section className="">
              <Scoreboard players={gameData?.players} playerId={id} />
              <article className="flex flex-col gap-8">
                <h1 className="text-5xl font-bold">{gameData?.phrase[0]}</h1>

                {gameData.phase === 0 && (
                  <div className="fixed inset-x-0 bottom-10 flex flex-col justify-center items-center gap-4">
                    <div className="flex justify-center items-center rounded-box gap-2">
                      {player?.hand?.map((card: any, index: number) => {
                        return (
                          <Card
                            key={card.id}
                            card={{ ...card, index }}
                            handleClick={handleClick}
                            disabled={gameData?.phase !== 0}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {gameData.phase === 1 && (
                  <div className="flex flex-col justify-center items-center rounded-box gap-2">
                    Vote on the card you think it is the best fit for the
                    phrase:
                    {gameData?.votingCards?.map((card: any, index: number) => {
                      return (
                        <Card
                          key={card.id}
                          card={{ ...card, index }}
                          handleClick={handleClick}
                          disabled={gameData?.phase !== 1}
                        />
                      );
                    })}
                  </div>
                )}

                {gameData.phase === 2 && (
                  <div className="flex flex-col justify-center items-center rounded-box gap-2">
                    Battle results:
                    <Card
                      card={{
                        ...gameData?.votingCards?.sort(
                          (cardA: any, cardB: any) => cardB.votes - cardA.votes
                        )[0],
                        index: 0,
                      }}
                      handleClick={handleClick}
                      disabled={gameData?.phase !== 1}
                    />
                  </div>
                )}

                {!!selectedCard ? (
                  <button
                    className="btn btn-secondary absolute right-5 bottom-5"
                    onClick={handleClick}
                  >
                    Confirm
                  </button>
                ) : (
                  ""
                )}
              </article>
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
