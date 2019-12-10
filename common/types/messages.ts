import { ConnectionStatus } from "./connection-status";
import { WordTuple } from "./word-tuple";

export interface Message<Type extends string, Data = undefined> {
  type: Type;
  data?: Data;
}

export type ConnectionStatusMessage = Message<
  "connection-status",
  ConnectionStatus
>;
export type ErrorMessage = Message<"error", string>;

export type WordStreamStatusMessage = Message<"word-stream-status">;
export type WordStreamSetHashtagMessage = Message<
  "word-stream-set-hashtag",
  string
>;

export type NoopMessage = Message<"noop">;
export type WordStreamDataMessage = Message<"word-stream", WordTuple[]>;
export type EveryMessage =
  | ConnectionStatusMessage
  | NoopMessage
  | ErrorMessage
  | WordStreamStatusMessage
  | WordStreamSetHashtagMessage
  | WordStreamDataMessage;

export function newMessage<T extends EveryMessage>(
  type: T["type"],
  data?: T["data"]
): T {
  return { type, data } as T;
}

export function filterMessages(type: EveryMessage["type"]) {
  return (message: EveryMessage) => message.type === type;
}
