import { Observable, Observer } from "rxjs";
import { share } from "rxjs/operators";
import request, { Response } from "request";

const TWITTER_TWEETS_STREAM =
  "https://stream.twitter.com/1.1/statuses/filter.json";

interface Tweet {
  text: string;
  extended_tweet: { full_text: string };
}

function tweetToString({ extended_tweet, text }: Tweet) {
  return extended_tweet ? extended_tweet.full_text : text;
}

const streamRequest = (hashtag: string) =>
  request({
    url: TWITTER_TWEETS_STREAM,
    qs: { track: hashtag },
    oauth: {
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      token: process.env.ACCESS_TOKEN_KEY,
      token_secret: process.env.ACCESS_TOKEN_SECRET,
    },
    headers: {
      Accept: "*/*",
      Connection: "close",
      "User-Agent": "node-twitter/0.4.0",
    },
  });

export const tweetStream = (term: string): Observable<string[]> => {
  return Observable.create((observer: Observer<string[]>) => {
    let interval: NodeJS.Timeout;

    let currentRequest = streamRequest(term);

    currentRequest.on("response", (response: Response) => {
      let buffer = "";
      try {
        if (response.statusCode !== 200) {
          throw new Error(
            `Status code: ${response.statusCode}. ${response.statusMessage}`
          );
        }

        response.on("data", (chunk: Buffer) => {
          buffer += chunk.toString("utf8");
        });

        interval = setInterval(() => {
          const rawTweets = buffer.match(/((.+)\r\n)/gi) || [];
          const tweets = [];
          rawTweets.forEach(tweet => {
            buffer = buffer.replace(tweet, "");
            tweets.push(tweetToString(JSON.parse(tweet)));
          });
          if (tweets.length > 0) {
            observer.next(tweets);
          }
        }, 500);

        response.on("error", (error: Error) => {
          currentRequest = null;
          response.destroy();
          observer.error(error);
        });

        response.on("end", () => observer.complete());
      } catch (error) {
        currentRequest = null;
        response.destroy();
        observer.error(error);
      }
    });
    return () => {
      if (currentRequest) {
        currentRequest.abort();
      }
      clearInterval(interval);
    };
  }).pipe(
    /** Converts the observable into a multiplexed subject.
      This deduplicates the requests so that many subscriptions to the observable
      only causes one request and tweet stream.
      See: https://rxjs-dev.firebaseapp.com/api/operators/share */
    share()
  );
};
