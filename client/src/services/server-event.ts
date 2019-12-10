import { websocketSubject$ } from "./websocket";
import { EveryMessage } from "common/types/messages";

/**
 * Simple wrapper for sending messages to the server
 * through websocketSubject. This function was
 * added for readability
 */
export const sendServerEvent = (message: EveryMessage) =>
  websocketSubject$.next(message);
