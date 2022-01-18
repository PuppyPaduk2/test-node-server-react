import { useContext, useMemo } from "react";
import { initialState } from "./initial-state";

export function useInitialValue<Value>(
  handler: (value?: Value) => Value,
  key?: string
): Value {
  const initial = useContext(initialState);

  return useMemo(() => {
    const value = key && initial.has(key) ? initial.get(key) : undefined;

    return handler(value);
  }, []);
}
