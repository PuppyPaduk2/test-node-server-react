import { Dispatch, SetStateAction, useCallback, useContext, useState } from "react";
import { initialState } from "./initial-state";

type UseStoreOptions = {
  key?: string;
};

export function useStore<Value>(
  defaultValue: Value,
  options:  UseStoreOptions = {}
): [Value, Dispatch<SetStateAction<Value>>] {
  const { key } = options;
  const initial = useContext(initialState);
  const [value, setStateValue] = useState<Value>(
    options.key ? initial.get(options.key) : defaultValue
  );
  const setState: Dispatch<SetStateAction<Value>> = useCallback((value) => {
    setStateValue((prev) => {
      let next: Value;

      if (value instanceof Function) {
        next = value(prev);
      } else {
        next = value;
      }

      if (key) {
        initial.set(key, next);
      }

      return next;
    });
  }, [key]);

  return [value, setState];
}
