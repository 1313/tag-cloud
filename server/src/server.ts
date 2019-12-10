import WebSocket, { Server } from "ws";
import { IncomingMessage } from "http";
import { TagCloudWebSocketController } from "./websocket-controller";
import { EveryMessage } from "common/types/messages";

function onConnection(server: Server) {
  return function(websocket: WebSocket, request: IncomingMessage) {
    console.log(
      `New client connected: ${request.connection.remoteAddress}, Number of clients: ${server.clients.size}`
    );

    websocket.on("message", onMessage(websocket));
  };
}

function onMessage(rawWebSocket: WebSocket) {
  return function(rawMessage: WebSocket.Data) {
    const websocket = new TagCloudWebSocketController(rawWebSocket);
    const message = JSON.parse(rawMessage.toString()) as EveryMessage;
    switch (message.type) {
      case "connection-status": {
        websocket.onConnectionStatus(message);
        break;
      }
      case "word-stream-status": {
        websocket.onWordsStreamStatus();
        break;
      }
      case "word-stream-set-hashtag": {
        websocket.omWordStreamSetHashtag(message);
        break;
      }
      case "noop":
        break;
      default:
        console.log("Unknown message", message);
        break;
    }
  };
}

export function configureServer(server: Server) {
  server.on("connection", onConnection(server));
  server.on("listening", () =>
    console.log("Tag Cloud Server listening on port:", server.options.port)
  );
}
