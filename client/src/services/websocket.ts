import { webSocket } from "rxjs/webSocket";
import { SERVER_HOST, SERVER_PORT } from "../config";
import { EveryMessage } from "common/types/messages";

/**
 * Websocket subject
 * See: https://rxjs-dev.firebaseapp.com/api/webSocket/webSocket
 */
export const websocketSubject$ = webSocket<EveryMessage>({
  url: `ws://${SERVER_HOST}:${SERVER_PORT}`,
  deserializer: ({ data }) => JSON.parse(data),
});
