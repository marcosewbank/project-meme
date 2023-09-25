"use client";

import { useState } from "react";

import { playerJoined } from "../context/emit";

const Page = () => {
  const [player, setPlayer] = useState("");

  function handleSubmit(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();

    if (player.length) {
      playerJoined(player);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer(event.currentTarget.value);
  };

  return (
    <main className="flex flex-row w-full min-h-screen items-center justify-center p-4 max-w-4xl m-auto">
      <section className="flex w-full h-full">
        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center w-full">
          <div className="flex flex-col p-4 gap-4 w-full">
            <label
              htmlFor="name"
              className="flex flex-col items-start label cursor-pointer gap-2 w-full"
            >
              <span className="label-text hidden">Type your nickname</span>
              <input
                type="text"
                className="input input-bordered input-primary w-full"
                placeholder="Type your nickname"
                name="nickname"
                onChange={handleInputChange}
              />
            </label>

            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
