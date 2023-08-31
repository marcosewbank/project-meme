import { EventsController } from "./controllers";
import { Events, ServerRepository } from "./repositories";

const eventsController = new EventsController();
const events = new Events(eventsController);
const server = new ServerRepository(events);

server.events_init();

// @ts-ignore
server.httpServer.listen(3333, () => { console.log("Server is running on port: 3333") });
