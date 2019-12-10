import { retryWhen, delay } from "rxjs/operators";
import { Observable } from "rxjs";
import { WebsocketEvent } from "../types/WebsocketEvent";

/**
 * Retry policy that restarts an observable/subject
 * when an error occurs. This gives is reconnect support
 * for the websocketSubject.
 */
export const retryPolicy = <T>() =>
  retryWhen<T>((errors: Observable<WebsocketEvent>) =>
    errors.pipe(delay(1000))
  );
