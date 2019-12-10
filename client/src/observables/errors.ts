import { map, startWith } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";
import { websocketSubject$ } from "../services/websocket";
import { retryPolicy } from "../services/retry-policy";
import {
  filterMessages,
  ErrorMessage,
  newMessage,
} from "common/types/messages";

export const errors$: Observable<string> = websocketSubject$
  // This allows us to have many subscriptions to the same
  // websocketSubject. If we would not use this, each subscription
  // would open a new websocket connection
  // See: https://rxjs-dev.firebaseapp.com/api/webSocket/webSocket
  .multiplex(
    () => newMessage("noop"),
    () => newMessage("noop"),
    // This parameter filters out individual messages from all of the messages
    // that travels through the websocket.
    filterMessages("error")
  )
  .pipe(
    map((message: ErrorMessage) => message.data),
    retryPolicy()
  );
