import { map, startWith } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";
import { websocketSubject$ } from "../services/websocket";
import { retryPolicy } from "../services/retry-policy";

import {
  newMessage,
  ConnectionStatusMessage,
  filterMessages,
} from "common/types/messages";
import { ConnectionStatus } from "common/types/connection-status";

export const connectionStatus$: Observable<ConnectionStatus> = websocketSubject$
  // This allows us to have many subscriptions to the same
  // websocketSubject. If we would not use this, each subscription
  // would open a new websocket connection.
  // See: https://rxjs-dev.firebaseapp.com/api/webSocket/webSocket
  .multiplex(
    () =>
      newMessage<ConnectionStatusMessage>(
        "connection-status",
        ConnectionStatus.Connecting
      ),
    () =>
      newMessage<ConnectionStatusMessage>(
        "connection-status",
        ConnectionStatus.Disconnected
      ),
    // This parameter filters out individual messages from all of the messages
    // that travels through the websocket.
    filterMessages("connection-status")
  )
  .pipe(
    startWith({ data: ConnectionStatus.Connecting }),
    map((message: ConnectionStatusMessage) => message.data),
    retryPolicy()
  );
