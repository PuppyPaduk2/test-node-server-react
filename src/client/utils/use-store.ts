import { Dispatch, useCallback, useContext, useState } from "react";
import { initialState } from "./initial-state";
import { useInitialValue } from "./use-initial-value";
import { getSide } from "./get-side";

type UseStoreOptions = {
  key?: string;
};

const side = getSide();

export function useStore<Value>(
  defaultValue: Value,
  options:  UseStoreOptions = {}
): [Value, Dispatch<Value>] {
  const { key } = options;
  const initial = useContext(initialState);
  const initialValue = useInitialValue<Value>((value) => value ?? defaultValue, key);
  const [value, setStateValue] = useState<Value>(initialValue);
  const setState: Dispatch<Value> = useCallback((value) => {
    setStateValue(value);

    if (side === "node" && key) {
      initial.set(key, value);
    }
  }, [key]);

  return [value, setState];
}
