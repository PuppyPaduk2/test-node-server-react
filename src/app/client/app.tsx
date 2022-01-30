import { createPreFetch } from "libs/pre-fetch";
import React, { memo, useContext, useState } from "react";

export const preFetchApp = createPreFetch({
  loaders: {
    app: {
      path: "(.*)",
      defaultValue: { text: "App default value" },
      load: () => Promise.resolve({ text: "App" }),
    },
  },
});

const Content = memo(() => {
  const { app } = useContext(preFetchApp.context);
  const [text, setText] = useState(app?.text ?? "");

  return (
    <>
      <div>{text}</div>
      <div>
        <button onClick={() => setText(prev => prev + "x")}>Change</button>
      </div>
    </>
  );
});

export const App = memo(() => {
  return (
    <div>
      <Content />
    </div>
  );
});
