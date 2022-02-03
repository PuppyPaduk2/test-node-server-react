import React from "react";
import { hydrate } from "react-dom";
import { App, preFetchComponents, preFetchData } from "./app";
import { BrowserRouter } from "react-router-dom";

declare global {
  interface Window { initData?: typeof preFetchData.defaultData; }
}

const rootSelector = "#root";

(async () => {
  const initData = "initData" in window
    ? (window.initData ?? preFetchData.defaultData)
    : preFetchData.defaultData;
  const components = await preFetchComponents(location.pathname);
  const app = (
    <preFetchData.context.Provider value={initData}>
      <preFetchComponents.context.Provider value={components}>
        <preFetchData.ClearData>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </preFetchData.ClearData>
      </preFetchComponents.context.Provider>
    </preFetchData.context.Provider>
  );
  const rootElement = document.querySelector(rootSelector);
  
  delete window.initData;
  hydrate(app, rootElement);
})();
