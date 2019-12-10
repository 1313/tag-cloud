import { Server } from "ws";
import { configureServer } from "./server";

const websocketServer = new Server({
  host: process.env.SERVER_HOST,
  port: parseInt(process.env.SERVER_PORT),
});

configureServer(websocketServer);
