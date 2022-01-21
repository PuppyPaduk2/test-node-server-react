import { useContext, useMemo } from "react";
import { initialValuesContext } from ".";

export function useInitialValue<Value>(
  handler: (value?: Value) => Value,
  key?: string
): Value {
  const initialValues = useContext(initialValuesContext);

  return useMemo(() => {
    const value = key && initialValues.has(key) ? initialValues.get(key) : undefined;

    return handler(value);
  }, []);
}
