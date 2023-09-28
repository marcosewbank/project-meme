"use client";
import NoSSR from "react-no-ssr";
import Image from "next/image";

import Login from "../components/login";
import { useSocketContext } from "../context";

const Page = () => {
  const { id, gameData } = useSocketContext();
  console.log("🚀 ~ file: page.tsx:9 ~ Page ~ id:", id);
  console.log("🚀 ~ file: page.tsx:9 ~ Page ~ test:", gameData);

  return (
    <main className="flex flex-row w-full min-h-screen items-center justify-center p-4 max-w-4xl m-auto">
      <NoSSR>
        {id ? (
          <section>
            <Image
              unoptimized
              width={200}
              height={300}
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWFkZjV1MW9najVkdzByY25oMG1uMmpxNDI1YWI1emk5aW84MXJpZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/65AOSg4ntqDzDJHUh4/giphy.gif"
              alt="meme"
            />
          </section>
        ) : (
          <Login />
        )}
      </NoSSR>
    </main>
  );
};

export default Page;
