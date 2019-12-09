const Twitter = require("twitter");
const clear = require("clear-console");
const pluralize = require("pluralize");

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

const counts = {};
const [, , ...trackParts] = process.argv;
const track = trackParts.join(" ");
console.log(track);
var stream = client.stream("statuses/filter", {
  track,
});

stream.on("data", function(event) {
  const map = StopWords[event.lang];

  const text = event.extended_tweet
    ? event.extended_tweet.full_text
    : event.text;

  if (event && map) {
    text
      .split(" ")
      .map(word =>
        pluralize.singular(word.replace(/[^åäöa-z0-9]/gi, "").toLowerCase())
      )
      .filter(
        word =>
          word !== track &&
          !map[word] &&
          /^[åäöa-z0-9]{2,}$/gi.test(word) &&
          !/^[0-9]+$/gi.test(word)
      )
      .forEach(word => {
        if (counts[word]) {
          counts[word]++;
        } else {
          counts[word] = 1;
        }
      });
  }
  clear();
  const min = Math.min(...Object.values(counts));
  const max = Math.max(...Object.values(counts));

  console.log(
    Object.entries(counts)
      .sort(([, ac], [, bc]) => bc - ac)
      .slice(0, 20)
      .map(([key, val]) => [key, (val - min) / (max - min || 1) + 1])
  );
});
