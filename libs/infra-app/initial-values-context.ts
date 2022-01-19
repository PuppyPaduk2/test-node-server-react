import { createContext } from "react";

export type InitialValues = Map<string, any>;

export function createInitialValuesContextValue(values: object = {}): InitialValues {
  return new Map(Object.entries(values));
}

export const initialValuesContext = createContext<InitialValues>(createInitialValuesContextValue());

export const InitialValuesProvider = initialValuesContext.Provider;
