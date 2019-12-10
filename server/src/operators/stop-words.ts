import fs from "fs";
import path from "path";

const rawStopWords = fs
  .readFileSync(path.resolve(__dirname, "./stop-words.csv"))
  .toString("utf-8");

export const StopWords = new Set(rawStopWords.split(", "));
