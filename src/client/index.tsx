import React from "react";
import { loadableReady } from '@loadable/component';
import { hydrate } from "react-dom";
import { App } from "./app";

loadableReady(() => {
  const root = document.querySelector('#root');

  hydrate(<App />, root);
});
