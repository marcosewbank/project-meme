import { Events, ServerRepository } from "./repositories";

const events = new Events();
const server = new ServerRepository(events);

const PORT = 3333

server.init(PORT)
server.events_init();
