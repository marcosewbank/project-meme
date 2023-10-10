"use client";
import { useState } from "react";
import NoSSR from "react-no-ssr";
import Image from "next/image";

import Login from "../components/login";
import Scoreboard from "../components/scoreboard";
import { useSocketContext } from "../context";
import { playerReady } from "../context/emit";

const Page = () => {
  const { id, gameData } = useSocketContext();

  const [selectedCard, setSelectedCard] = useState(0);

  const player = gameData?.players[id];

  console.log(
    "🚀 ~ file: page.tsx:19 ~ Page ~ gameData?.players:",
    gameData?.players
  );

  console.log("🚀 ~ file: page.tsx:13 ~ Page ~ selectedCard:", selectedCard);

  const handleClick = () => {
    playerReady({ playerId: id, selectedCard });
  };

  return (
    <main className="relative">
      <div className="flex flex-row w-full min-h-screen items-center justify-center p-4 max-w-4xl m-auto">
        <NoSSR>
          {player ? (
            <section className="flex flex-col gap-8">
              <Scoreboard players={gameData?.players} playerId={id} />
              <h1 className="text-5xl font-bold">{gameData?.phrase[0]}</h1>

              <div className="flex justify-center items-center rounded-box">
                {player?.hand?.map((card: any, index: number) => {
                  return (
                    <button
                      key={card.id}
                      className="focus:ring focus:border-primary"
                      onClick={() => setSelectedCard(index)}
                    >
                      <Image
                        className="object-cover h-52 w-52"
                        unoptimized
                        width={200}
                        height={200}
                        src={card.src}
                        alt={card.slug}
                      />
                    </button>
                  );
                })}
              </div>

              <button className="btn" onClick={handleClick}>
                ready
              </button>
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
