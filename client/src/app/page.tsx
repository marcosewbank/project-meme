"use client";

import { FormEvent } from "react";

// type CreateRoomResponse<T = "error" | "success"> = T extends "success"
//   ? {
//       type: T;
//       room: string;
//       public: boolean;
//     }
//   : {
//       type: T;
//       message: string;
//     };

interface RoomsData {
  [roomName: string]: number;
}

// async function Rooms() {
//   const rooms: RoomsData = await (
//     await fetch(`http://localhost:3333/rooms`)
//   ).json();
//   return { rooms };
// }

export default function Home() {
  // const rooms = Rooms();
  // console.log("🚀 ~ file: page.tsx:38 ~ Home ~ rooms:", rooms);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("🚀 ~ file: page.tsx:40 ~ onSubmit ~ event:", event);

    // if (room.name == "") {
    //   alert("Input is empty");
    //   return;
    // }

    // let response: CreateRoomResponse = await(
    //   await fetch(`${process.env.FRONTEND_URL}/createRoom`, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       name: room.name,
    //       public: room.public,
    //     }),
    //   })
    // ).json();

    // if (response.type == "success") {
    //   redirect(`/${response.room}`);
    // } else {
    //   alert(response.message);
    // }
  }

  return (
    <main className="flex flex-row w-full min-h-screen items-center justify-center p-4 max-w-4xl m-auto">
      <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
        <form className="flex flex-col p-4 gap-4 w-full" onSubmit={onSubmit}>
          <label
            htmlFor="name"
            className="flex flex-col items-start label cursor-pointer gap-2"
          >
            <span className="label-text hidden">Type your nickname</span>
            <input
              type="text"
              className="input input-bordered input-primary w-full"
              placeholder="Type your nickname"
            />
          </label>
          <div className="form-control">
            <div className="collapse bg-base-200">
              <input type="checkbox" className="peer" />

              <div className="collapse-title">Create room</div>
              <div className="collapse-content">
                <input
                  type="text"
                  className="input input-bordered input-primary w-full"
                  placeholder="Room name"
                />
                <label className="label cursor-pointer flex justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
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

      <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
        <div className="flex flex-col justify-start items-start p-4 gap-4 w-full">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Server</th>
                  <th>players</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
