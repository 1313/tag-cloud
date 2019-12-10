import WebSocket = require("ws");
import { SubscriptionLike } from "rxjs";
import { tweetStream } from "./tweet-stream";
import { tweetsToWordFrequencyList } from "./operators/word-cloud-operators";
import { ConnectionStatus } from "common/types/connection-status";
import {
  EveryMessage,
  newMessage,
  ConnectionStatusMessage,
  WordStreamSetHashtagMessage,
} from "common/types/messages";
export class TagCloudWebSocketController {
  private static Subscriptions = new WeakMap<WebSocket, SubscriptionLike>();

  constructor(private readonly websocket: WebSocket) {}

  private send(message: EveryMessage) {
    this.websocket.send(JSON.stringify(message));
  }

  onConnectionStatus(message: ConnectionStatusMessage) {
    if (message.data === ConnectionStatus.Connecting) {
      this.send(newMessage("connection-status", ConnectionStatus.Connected));
    }
  }
  omWordStreamSetHashtag(message: WordStreamSetHashtagMessage) {
    const hashtag = message.data;
    const tweets$ = tweetStream(hashtag);
    const words$ = tweets$.pipe(tweetsToWordFrequencyList(hashtag));
    const words = words$.subscribe(
      commonWords => this.send(newMessage("word-stream", commonWords)),
      error => this.send(newMessage("error", error.message))
    );

    TagCloudWebSocketController.Subscriptions.set(this.websocket, words);
  }
  onWordsStreamStatus() {
    const words = TagCloudWebSocketController.Subscriptions.get(this.websocket);
    words?.unsubscribe();
  }
}
