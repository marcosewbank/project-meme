"use client";
import NoSSR from "react-no-ssr";

import { playerReady } from "../context/emit";
import { useSocketContext } from "../context";

import { Login, Scoreboard, Card } from "../components";

const Page = () => {
  const { id, gameData, selectedCard } = useSocketContext();

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
            <section className="flex flex-col gap-8">
              <Scoreboard players={gameData?.players} playerId={id} />
              <article>
                <h1 className="text-5xl font-bold">{gameData?.phrase[0]}</h1>

                {/* {gameData.phase === 1 && (
                  <>
                    Not it is time to vote:
                    <Cards
                      cards={gameData?.votingCards}
                      disabled={gameData?.phase !== 1}
                      handleSelectedCard={handleSelectedCard}
                      selectedCardIndex={selectedCard}
                    />
                  </>
                )} */}
              </article>

              {/* {gameData.phase === 2 && (
                <Cards
                  cards={gameData?.votingCards.sort(
                    (cardA: any, cardB: any) => cardB.votes - cardA.votes
                  )}
                  disabled={gameData?.phase === 2}
                  handleSelectedCard={handleSelectedCard}
                  selectedCardIndex={selectedCard}
                />
              )} */}

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
