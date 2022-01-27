import React from "react";
import { loadableReady } from '@loadable/component';
import { hydrate } from "react-dom";
import { createRequestContextValue } from "./requests-context";
import { App } from "./app";
import { createInitialValuesContextValue } from "./initial-values-context";

declare global {
  interface Window { initialState?: object; }
}

type Params = {
  selector: string;
  App: App;
};

export function attachClientApp(params: Params) {
  loadableReady(() => {
    const { selector: appSelector, App } = params;
  
    const root = document.querySelector(appSelector);
    const windowInitialValues = "initialState" in window ? window.initialState || {} : {};
    const initialValues = createInitialValuesContextValue();

    initialValues.deserialize(windowInitialValues);
    delete window.initialState;
    hydrate(
      <App
        initialValues={initialValues}
        requests={createRequestContextValue()}
      />,
      root
    );
  });
}
