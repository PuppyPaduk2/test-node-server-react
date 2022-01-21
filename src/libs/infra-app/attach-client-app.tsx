import React from "react";
import { loadableReady } from '@loadable/component';
import { hydrate } from "react-dom";
import { createRequestContextValue } from ".";
import { App } from "./app";
import { createInitialValuesContextValue } from "./initial-values-context";

declare global {
  interface Window { initialState: object; }
}

type Params = {
  selector: string;
  App: App;
};

export function attachClientApp(params: Params) {
  loadableReady(() => {
    const { selector: appSelector, App } = params;
  
    const root = document.querySelector(appSelector);
    const initialValues = "initialState" in window ? window.initialState : {};
  
    delete window.initialState;
    hydrate(
      <App
        initialValues={createInitialValuesContextValue(initialValues)}
        requests={createRequestContextValue()}
      />,
      root
    );
  });
}
