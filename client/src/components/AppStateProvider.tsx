import React, { createContext } from "react";
import useProfunctorState from "@staltz/use-profunctor-state";

import { AppState } from "../types/app-state";
import { ConnectionStatus } from "common/types/connection-status";

const initialState: AppState = {
  debug: { visible: false },
  connection: { status: ConnectionStatus.Disconnected },
  words: [],
  form: { search: "Trump", active: false },
};

export const AppStateContext = createContext(null);
interface AppStateProviderProps {
  children: JSX.Element;
}
/**
 * Provides the root AppState profunctor to the rest of the application
 * through context.
 */
export function AppStateProvider({
  children,
}: AppStateProviderProps): JSX.Element {
  const appStateProf = useProfunctorState(initialState);
  return (
    <AppStateContext.Provider value={appStateProf}>
      {children}
    </AppStateContext.Provider>
  );
}
