import React from "react";

import { ProfunctorProps } from "../types/profunctor-props";

import { AppState } from "../types/app-state";
import { AnimatePresence, motion } from "framer-motion";

export default function WordCloud({
  prof: { state },
}: ProfunctorProps<AppState>) {
  return (
    <AnimatePresence>
      {state.form.active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="card"
        >
          <h2>Streaming words for: {state.form.search}</h2>
          <hr />
          <div className="words inline stack-h">
            {state.words.length === 0 && <h3>No tweets yet...</h3>}
            {state.words.map(([word, fontSize]) => (
              <div
                className="word"
                style={{ fontSize: `${fontSize}rem` }}
                key={word}
              >
                {word}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
