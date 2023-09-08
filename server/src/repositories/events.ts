import { Socket } from "socket.io";
import { EVENT } from "../constants";

interface Room {
    name: string
    id: number
}

export class Events {
    private rooms: Room[]

    constructor() {
        this.rooms = [] as Room[]
    }

    // public methods
    public connection(socket: Socket): void {
        socket.emit(EVENT.ROOMS_CREATED, this.rooms)
    }

    public disconnect(socket: Socket) {
        console.log(socket)
    }

    public roomCreated(socket: Socket) {
        console.log('working')
        console.log(socket)
    }

    public playerConnect(socket: Socket) {
        console.log(socket)
    }

    public playerDisconnect(socket: Socket) {
        console.log(socket)
    }

}
