import { useContext } from "react";
import { AppStateContext } from "../components/AppStateProvider";
import { ProfunctorState } from "@staltz/use-profunctor-state";
import { AppState } from "../types/app-state";

/**
 * Wrapper hook for returing the AppState from AppStateContext
 */
export function useAppState(): ProfunctorState<AppState> {
  return useContext(AppStateContext);
}
