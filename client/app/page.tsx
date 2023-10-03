"use client";
import NoSSR from "react-no-ssr";
import Image from "next/image";

import Login from "../components/login";
import { useSocketContext } from "../context";
import { drawCards } from "../context/emit";

const Page = () => {
  const { id, gameData } = useSocketContext();
  console.log("🚀 ~ file: page.tsx:9 ~ Page ~ id:", id);
  console.log("🚀 ~ file: page.tsx:9 ~ Page ~ test:", gameData);

  const handleClick = () => {
    drawCards(id);
  };

  return (
    <main className="flex flex-row w-full min-h-screen items-center justify-center p-4 max-w-4xl m-auto">
      <NoSSR>
        {id ? (
          <section>
            <button className="btn" onClick={handleClick}>
              draw
            </button>
            <div className="flex justify-center items-center rounded-box">
              {gameData?.players[id]?.hand.map((card: any) => {
                return (
                  <div key={card.id} className="">
                    <Image
                      className="object-cover h-52 w-52"
                      unoptimized
                      width={200}
                      height={200}
                      src={card.src}
                      alt={card.slug}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <Login />
        )}
      </NoSSR>
    </main>
  );
};

export default Page;
