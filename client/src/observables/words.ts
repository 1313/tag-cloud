import { map } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";

import { retryPolicy } from "../services/retry-policy";
import {
  newMessage,
  WordStreamStatusMessage,
  filterMessages,
  WordStreamDataMessage,
} from "common/types/messages";

import { WordTuple } from "common/types/word-tuple";
import { websocketSubject$ } from "../services/websocket";

export const words$: Observable<WordTuple[]> = websocketSubject$
  // This allows us to have many subscriptions to the same
  // websocketSubject. If we would not use this, each subscription
  // would open a new websocket connection
  // See: https://rxjs-dev.firebaseapp.com/api/webSocket/webSocket
  .multiplex(
    () => newMessage<WordStreamStatusMessage>("word-stream-status"),
    () => newMessage<WordStreamStatusMessage>("word-stream-status"),
    // This parameter filters out individual messages from all of the messages
    // that travels through the websocket.
    filterMessages("word-stream")
  )
  .pipe(
    map((message: WordStreamDataMessage) => message.data),
    retryPolicy()
  );
