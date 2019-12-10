import { useEffect } from "react";

import { ProfunctorState } from "@staltz/use-profunctor-state";
import { lensProp } from "../utils/data";
import { words$ } from "../observables/words";

import { AppState } from "../types/app-state";
import { sendServerEvent } from "../services/server-event";
import { newMessage } from "common/types/messages";

/**
 * This hooks connects the words observable and pushes any changes
 * into the words profunctor.
 */
export function useWords(appStateProf: ProfunctorState<AppState>) {
  const wordsProf = appStateProf.promap(lensProp("words"));
  const errorProof = appStateProf
    .promap(lensProp("connection"))
    .promap(lensProp("error"));
  const { active, search } = appStateProf.state.form;
  useEffect(() => {
    let subscription;
    if (active) {
      wordsProf.setState(() => []);
      errorProof.setState(() => void 0);
      subscription = words$.subscribe(words => wordsProf.setState(() => words));
      sendServerEvent(newMessage("word-stream-set-hashtag", search));
    } else {
      subscription?.unsubscribe();
    }

    return () => subscription?.unsubscribe();
  }, [active]);
  return wordsProf;
}
