import { createContext } from "react";

export const basenameContext = createContext<string>("");

export const Basename = basenameContext.Provider;
