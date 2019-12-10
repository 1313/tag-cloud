import { pipe } from "rxjs";
import { map, scan } from "rxjs/operators";
import isUrl = require("is-url");
import { StopWords } from "./stop-words";
import { easeInOutCubic } from "./utils";

const FREQUENCY_INTERVAL = [0.5, 2];

const separateIntoCleanWords = () =>
  map<string[], string[]>(tweets =>
    tweets
      .join("")
      .toLowerCase()
      .split(" ")
      .map(word => (isUrl(word) ? word : word.replace(/[^@åäöa-z0-9 ]/gi, "")))
  );

const removeStopWords = (term: string) =>
  map<string[], string[]>(words =>
    words.filter(
      word =>
        word &&
        !isUrl(word) &&
        !StopWords.has(word) &&
        word !== "rt" &&
        word !== term.toLowerCase()
    )
  );
interface FrequencyMap {
  [key: string]: number;
}

type WordFrequencyTuple = [string, number];

const mergeIntoWordFrequencyMap = () =>
  scan((current: FrequencyMap, words: string[]) => {
    words.forEach(word => {
      current[word] = current[word] ? current[word] + 1 : 1;
    });
    return current;
  }, {});

const normalizeWordFrequencyMap = () =>
  map((wordFrequencies: FrequencyMap): WordFrequencyTuple[] => {
    const sortedByFrequency = Object.entries(wordFrequencies)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 100);

    const [, max] = sortedByFrequency.reduce((max, current) =>
      max[1] > current[1] ? max : current
    );
    const [, min] = sortedByFrequency.reduce((min, current) =>
      min[1] < current[1] ? min : current
    );

    return sortedByFrequency.map(([word, count]) => [
      word,
      normalizeFrequency(count, min, max),
    ]);
  });

function normalizeFrequency(count: number, min: number, max: number): number {
  const [minimum, maximum] = FREQUENCY_INTERVAL;

  return (
    easeInOutCubic(((maximum - minimum) * (count - min)) / (max - min || 1)) +
    minimum
  );
}

export function tweetsToWordFrequencyList(term) {
  return pipe(
    separateIntoCleanWords(),
    removeStopWords(term),
    mergeIntoWordFrequencyMap(),
    normalizeWordFrequencyMap()
  );
}
