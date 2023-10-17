import express from "express";
import { initializeConfig } from "./config/config";
import { configureSwagger } from "./config/swagger";
import { initializeSocketIO } from "./events/socket";
import initilizeRoutes from "./routes/routes";
import http from "http";

const app = express();
const server = http.createServer(app);

const port = 3005;

initializeConfig(app);
initilizeRoutes(app);
initializeSocketIO(server);
configureSwagger(app);
server.listen(port, () => {
  console.info(`App listening on port ${port}`);
});
