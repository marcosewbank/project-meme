"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";

type CreateRoomResponse<T = "error" | "success"> = T extends "success"
  ? {
      type: T;
      room: string;
      public: boolean;
    }
  : {
      type: T;
      message: string;
    };

interface RoomsList {
  name: string;
  players: number;
}

const url = "http://localhost:3333";

export default function Home() {
  const router = useRouter();
  const [rooms, setRooms] = useState<RoomsList[]>([]);
  const [player, setPlayer] = useState<string>("");
  const debouncePlayer = useDebounce(player, 500);

  useEffect(() => {
    fetch(`${url}/rooms`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRooms(data);
      });
  }, []);

  useEffect(() => {
    if (debouncePlayer) {
      localStorage.setItem("player", debouncePlayer);
    }
  }, [debouncePlayer]);

  const handleNickname = (event: FormEvent<HTMLInputElement>) => {
    const name = (event.target as HTMLInputElement).value;
    setPlayer(name);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const roomName = (event.target as HTMLFormElement).elements.namedItem(
      "roomName"
    ) as HTMLInputElement;

    const publicRoom = (event.target as HTMLFormElement).elements.namedItem(
      "publicRoom"
    ) as HTMLInputElement;

    const roomNameValue = roomName.value;
    const isPublicRoom = publicRoom.checked;

    if (roomNameValue) {
      let response: CreateRoomResponse = await (
        await fetch(`${url}/createRoom`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: roomNameValue,
            public: isPublicRoom,
          }),
        })
      ).json();

      if (response.type == "success") {
        router.push(`/room/${response.room}`);
      } else {
        alert(response.message);
      }
    }
  }

  return (
    <main className="flex flex-row w-full min-h-screen items-center justify-center p-4 max-w-4xl m-auto">
      <div className="flex w-full h-full">
        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center w-full">
          <label
            htmlFor="name"
            className="flex flex-col items-start label cursor-pointer gap-2 p-4 w-full"
          >
            <span className="label-text hidden">Type your nickname</span>
            <input
              type="text"
              className="input input-bordered input-primary w-full"
              placeholder="Type your nickname"
              name="nickname"
              onChange={handleNickname}
            />
          </label>
          <form className="flex flex-col p-4 gap-4 w-full" onSubmit={onSubmit}>
            <div className="form-control">
              <div className="collapse bg-base-200">
                <input type="checkbox" className="peer" />

                <div className="collapse-title">Create room</div>
                <div className="collapse-content">
                  <input
                    type="text"
                    className="input input-bordered input-primary w-full"
                    placeholder="Room name"
                    name="roomName"
                  />
                  <label className="label cursor-pointer flex justify-start gap-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      name="publicRoom"
                    />
                    <span className="label-text min-w-20">Public room</span>
                  </label>
                </div>
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>

        <div className="divider divider-horizontal" />

        <div className="flex flew-grow card bg-base-300 rounded-box place-items-center w-full">
          <div className="flex flex-col justify-start items-start p-4 gap-4 w-full">
            {rooms?.map(({ name, players }: RoomsList, index: number) => (
              <div key={`${name}-${index}`} className="indicator">
                <span className="indicator-item badge badge-secondary">
                  {players}
                </span>
                <Link className="btn" href={`/room/${name}`}>
                  <td>{name}</td>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
