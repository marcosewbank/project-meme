import ExpressApp, { Express } from "express";
import { Server } from "socket.io";
import { createServer, IncomingMessage, ServerResponse } from "http";

import { Events } from ".";
import { EVENT } from "../constants";

export class ServerRepository {
    public app: Express;
    public httpServer: Server<typeof IncomingMessage, typeof ServerResponse>;
    public io: Server;

    private events: Events;

    constructor(e: Events) {
        this.events = e;
        this.app = ExpressApp();
        // @ts-ignore
        this.httpServer = createServer(this.app);
        // @ts-ignore
        this.io = new Server(this.httpServer, {
            transports: ["websocket", "polling"],
            cors: {
                origin: "*",
                credentials: false
            }
        });
    }

    private onConnection() {
        this.io.on(EVENT.CONNECTION, this.events.connection);
    }

    private onDisconnect() {
        this.io.on(EVENT.DISCONNECT, this.events.disconnect);
    }

    private onPlayerConnected() {
        this.io.on(EVENT.PLAYER_CONNECTED, this.events.playerConnect);
    }

    private onPlayerDisconnected() {
        this.io.on(EVENT.PLAYER_DISCONNECTED, this.events.playerDisconnect);
    }

    private onRoomCreated() {
        this.io.on(EVENT.NEW_ROOM, this.events.roomCreated);
    }

    public init(port: number) {
        // @ts-ignore
        this.httpServer.listen(port, () => { console.log("Server is running on port: 3333") });
    }

    public events_init() {
        this.onConnection();
        this.onDisconnect();
        this.onPlayerConnected();
        this.onPlayerDisconnected();
        this.onRoomCreated();
    }
}
