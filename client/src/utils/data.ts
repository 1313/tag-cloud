import { Lens } from "@staltz/use-profunctor-state";

/**
 * This returns an lensObject to be used with profunctors.
 * It takes a property that you want to take from the profunctor.
 * as profunctors are composeable it can be done in a chain. like
 *
 * With the state object {a: {b: {c: 'd'}}} we can do:
 * const cProf = prof.promap(lensProp('a')
 *                   .promap(lensProp('b')
 *                   .promap(lensProp('c'))
 *
 * to get a new profunctor that allowes us to read and write to 'c'.
 */
export function lensProp<T, K extends keyof T>(property: K): Lens<T, T[K]> {
  return {
    get(state) {
      return state[property];
    },
    set(newInner, prevState) {
      return { ...prevState, [property]: newInner };
    },
  };
}
