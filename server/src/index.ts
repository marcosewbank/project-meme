import Express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

const app = Express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    path: "/room"
})

io.on('connection', (socket: Socket) => {
    console.log(socket)
})

httpServer.listen(3000)
