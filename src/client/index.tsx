import React from "react";
import { loadableReady } from '@loadable/component';
import { hydrate } from "react-dom";
import { App } from "./app";
import { createRequestState } from "./requests-state";
import { createInitialState } from "./initial-state";
declare global {
  interface Window { initialState: object; }
}

loadableReady(() => {
  const root = document.querySelector('#root');
  const initialState = "initialState" in window ? window.initialState : {};

  delete window.initialState;
  hydrate(
    <App
      initialState={createInitialState(initialState)}
      requestState={createRequestState()}
    />,
    root
  );
});
