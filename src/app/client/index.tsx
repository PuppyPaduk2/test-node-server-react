import React, { memo, useContext, useEffect } from "react";
import { loadableReady } from '@loadable/component';
import { hydrate } from "react-dom";
import { App, preFetchApp } from "./app";
import { BrowserRouter } from "react-router-dom";
import { initialStateKey } from "../common/constants";

const rootSelector = "#root";

const ClearInitialState = memo((props) => {
  const initialState = useContext(preFetchApp.context);

  useEffect(() => {
    for (let key in initialState) {
      if (({}).hasOwnProperty.call(initialState, key)) {
        delete initialState[key];
      }
    }
  }, [])

  return (
    <>
      {props.children}
    </>
  );
});

loadableReady(() => {
  const rootElement = document.querySelector(rootSelector);
  const initialState: any = initialStateKey in window ? window[initialStateKey] || {} : {};
  const app = (
    <preFetchApp.context.Provider value={initialState}>
      <ClearInitialState>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClearInitialState>
    </preFetchApp.context.Provider>
  );

  delete window.initialState;
  hydrate(app, rootElement);
});
