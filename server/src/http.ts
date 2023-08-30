import ExpressApp, { Express } from 'express'
import { createServer, IncomingMessage, ServerResponse } from 'http'
import { Server, Socket } from 'socket.io'

export class ServerController {
    public app: Express;
    public httpServer: Server<typeof IncomingMessage, typeof ServerResponse>;
    public io: Server;

    constructor() {
        this.app = ExpressApp()
        this.httpServer = createServer(this.app);
        this.io = new Server(this.httpServer)
    }

    connectionEvent<T>(fn: (socket: Socket) => T) {
        this.io.on("connection", fn)
    }

    disconnectEvent<T>(fn: (socket: Socket) => T) {
        this.io.on("disconnect", fn)
    }
}
