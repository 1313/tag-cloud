import { useEffect } from "react";
import { ProfunctorState } from "@staltz/use-profunctor-state";
import { lensProp } from "../utils/data";
import { AppState } from "../types/app-state";
import { errors$ } from "../observables/errors";

/**
 * This hook connects to the error observable and
 * pushes changes into the error profunctor.
 * It also deactivates any ongoing stream when an error occurs via
 * the active profunctor.
 */
export function useListenForErrors(appStateProf: ProfunctorState<AppState>) {
  const errorProof = appStateProf
    .promap(lensProp("connection"))
    .promap(lensProp("error"));
  const activeProof = appStateProf
    .promap(lensProp("form"))
    .promap(lensProp("active"));

  useEffect(() => {
    let subscription = errors$.subscribe(error => {
      activeProof.setState(() => false);
      errorProof.setState(() => error);
    });

    return () => subscription?.unsubscribe();
  }, []);
  return errorProof;
}
