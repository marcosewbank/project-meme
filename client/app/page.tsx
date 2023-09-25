"use client";
import NoSSR from "react-no-ssr";

import Login from "../components/login";
import { useSocketContext } from "../context";

const Page = () => {
  const { id, gameData } = useSocketContext();
  console.log("🚀 ~ file: page.tsx:9 ~ Page ~ test:", gameData);

  return (
    <main className="flex flex-row w-full min-h-screen items-center justify-center p-4 max-w-4xl m-auto">
      <NoSSR>{id ? <section></section> : <Login />}</NoSSR>
    </main>
  );
};

export default Page;
