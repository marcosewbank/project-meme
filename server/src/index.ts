import { ServerController } from "./http"

const server = new ServerController()

server.httpServer.listen(3333, () => {
    console.log("Server is running on port 3333")
})
