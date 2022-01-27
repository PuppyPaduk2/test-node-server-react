import { Dispatch, useCallback, useContext, useState } from "react";
import { initialValuesContext } from "./initial-values-context";
import { useInitialValue } from "./use-initial-value";
import { getSide } from "./get-side";

const side = getSide();

export function useStore<Value>(
  defaultValue: Value,
  key: string
): [Value, Dispatch<Value>] {
  const initialValues = useContext(initialValuesContext);
  const initialValue = useInitialValue<Value>((value) => value ?? defaultValue, key);
  const [value, setStateValue] = useState<Value>(initialValue);
  const setState: Dispatch<Value> = useCallback((value) => {
    setStateValue(value);

    if (side === "node" && key) {
      initialValues.set(key, value);
    }
  }, [key]);

  return [value, setState];
}
