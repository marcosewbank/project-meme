import Link from "next/link";

const Page = () => {
  return (
    <main className="flex flex-row w-full min-h-screen p-4 max-w-4xl m-auto">
      <Link href="/game"> Go to the game :D </Link>
    </main>
  );
};

export default Page;
