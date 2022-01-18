import React from "react";
import { loadableReady } from '@loadable/component';
import { hydrate } from "react-dom";
import { App } from "./app";
import { createRequestState } from "./utils/requests-state";
import { createInitialState } from "./utils/initial-state";
// import { BrowserRouter } from "react-router-dom";
declare global {
  interface Window { initialState: object; }
}

loadableReady(() => {
  const root = document.querySelector('#root');
  const initialState = "initialState" in window ? window.initialState : {};

  delete window.initialState;
  hydrate(
    // <BrowserRouter basename="main/dashboard">
      <App
        initialState={createInitialState(initialState)}
        requestState={createRequestState()}
      />,
    // </BrowserRouter>,
    root
  );
});
