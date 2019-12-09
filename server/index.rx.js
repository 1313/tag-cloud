const clear = require("clear-console");
const { fromEvent } = require("rxjs");
const { take, flatMap, map, filter, scan, mapTo } = require("rxjs/operators");
const isUrl = require("is-url");
const Twitter = require("twitter");
const RawStopWords = require("./stopwords.json");

const StopWords = Object.fromEntries(
  Object.entries(RawStopWords).map(([lang, words]) => [
    lang,
    Object.fromEntries(words.map(word => [word.toLowerCase(), true])),
  ])
);

var client = new Twitter({
  consumer_key: "8aEEg2FCZWOniQDd4LcMjbLff",
  consumer_secret: "WxSFJ31BI3nab2P2P91ZG7x97zhlNdSskcsmUuWpvgNREVc9At",
  access_token_key: "1153050499240906752-ubmYjk2A0qepMlnyEtTWmnVt7pcpry",
  access_token_secret: "PICaimR4GzMj2xeLjMwKnj5gUzJsh0tc6cqZjh49xTgQL",
});
const [, , ...trackParts] = process.argv;
const track = trackParts.join(" ");

var stream = client.stream("statuses/filter", {
  track,
});

fromEvent(stream, "data")
  .pipe(
    filter(({ lang }) => !!StopWords[lang]),
    flatMap(({ lang, extended_tweet, text }) => {
      const tweetText = extended_tweet ? extended_tweet.full_text : text;
      return tweetText
        .toLowerCase()
        .split(" ")
        .map(word => (isUrl(word) ? word : word.replace(/[^åäöa-z0-9 ]/gi, "")))
        .filter(
          word =>
            !isUrl(word) &&
            !StopWords[lang][word] &&
            word.length > 2 &&
            word !== track
        );
    }),
    scan((current, word) => {
      current[word] = current[word] ? current[word] + 1 : 1;
      return current;
    }, {}),
    map(stats =>
      Object.entries(stats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 100)
    )
  )

  .subscribe(x => {
    clear();
    console.log(x);
  });
