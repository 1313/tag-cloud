import { useEffect } from "react";
import { ProfunctorState } from "@staltz/use-profunctor-state";

import { AppState } from "../types/app-state";
import { connectionStatus$ } from "../observables/connection-status";
import { lensProp } from "../utils/data";

/**
 * This hook connects to the connectionStatus observable and
 * pushes changes into the connection.status profunctor.
 */
export function useConnectionStatus(appStateProf: ProfunctorState<AppState>) {
  const connectionStatusProf = appStateProf
    .promap(lensProp("connection"))
    .promap(lensProp("status"));
  useEffect(() => {
    let subscription = connectionStatus$.subscribe(connectionStatus =>
      connectionStatusProf.setState(() => connectionStatus)
    );
    return () => subscription?.unsubscribe();
  }, []);
  return connectionStatusProf;
}
