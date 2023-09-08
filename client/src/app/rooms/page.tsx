"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { EVENT } from "../../utils";

const socket = io("http://localhost:3333", {
    transports: ['websocket', 'polling']
});

interface Room {
    name: string;
    id: number;
}

let count = 0;

const Rooms = () => {
    const [rooms, setRooms] = useState<Room[]>([] as Room[]);
    const roomNameInputRef = useRef<HTMLInputElement | null>(null);

    function handleNewRoom(e: FormEvent) {
        e.preventDefault();
        const roomName = roomNameInputRef!.current!.value;
        console.log('emiting', { name: roomName, id: count })
        socket.emit(EVENT.NEW_ROOM, { name: roomName, id: count });
        count++;
    }

    useEffect(() => {
        console.log("working");

        socket.on(EVENT.ROOMS_CREATED, (rooms) => {
            console.log(rooms)
        })

        setRooms([])
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ul key={rooms.length}>
                {rooms.length > 0 &&
                    rooms.map(room => (
                        <li key={room.id} className="text-white">
                            {room.name}
                        </li>
                    ))}
            </ul>
            <form onSubmit={handleNewRoom}>
                <input
                    className="text-black"
                    minLength={3}
                    maxLength={14}
                    type="text"
                    id="room-name"
                    name="room-name"
                    required
                    aria-required="true"
                    autoComplete="off"
                    ref={roomNameInputRef}
                />
                <button type="submit">Create new Room</button>
            </form>
        </main>
    );
};

export default Rooms;
