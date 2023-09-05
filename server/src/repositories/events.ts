import { Socket } from "socket.io";
import { EventsController } from "../controllers";

export class Events {
    private eventController: EventsController;

    constructor(e: EventsController) {
        this.eventController = e;
    }

    public connection(socket: Socket) {
        socket.on("", this.eventController.connect);
    }

    public disconnect(socket: Socket) {
        socket.on("", this.eventController.disconnect);
    }

    public playerConnect(socket: Socket) {
        socket.on("", this.eventController.playerConnect);
    }

    public playerDisconnect(socket: Socket) {
        socket.on("", this.eventController.playerDisconnect);
    }
}
