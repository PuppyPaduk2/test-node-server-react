import { createContext } from "react";

export type InitialState = Map<string, any>;

export const createInitialState = (values: object = {}): InitialState => new Map(Object.entries(values));

export const initialState = createContext<InitialState>(createInitialState());
