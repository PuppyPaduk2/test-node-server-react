import React, { memo, useContext, useState } from "react";
import { createPreFetch } from "libs/pre-fetch";

export const preFetchData = createPreFetch({
  app: {
    path: "*",
    defaultValue: { text: "App default value" },
    load: () => import("./root").then(({ getState }) => getState()),
  },
  usersData: {
    path: "/users*",
    defaultValue: { users: [] },
    load: ({ location }) => import("./users")
      .then(({ preFetchUsersData }) => preFetchUsersData(location)),
  },
});

export const preFetchComponents = createPreFetch({
  Rules: {
    path: "*",
    defaultValue: memo(() => <div>Loading rules...</div>),
    load: () => import("./rules").then(({ Rules }) => Rules),
  },
  Users: {
    path: "/users*",
    defaultValue: memo(() => <div>Loading users...</div>),
    load: () => import("./users").then(({ Users }) => Users),
  },
});

const Change = () => {
  const { app } = useContext(preFetchData.context);
  const [text, setText] = useState(app?.text ?? "");

  return (
    <>
      <div>
        <button onClick={() => setText(prev => prev + "x")}>Change</button>
      </div>
      <div>{text}</div>
    </>
  );
};

const Content = memo(() => {
  const { Rules, Users } = useContext(preFetchComponents.context);
  const { usersData } = useContext(preFetchData.context);

  return (
    <>
      <Change />
      <Rules />
      <Users {...usersData} />
    </>
  );
});

export const App = memo(() => {
  return (
    <div>
      <h1>Application</h1>
      <Content />
    </div>
  );
});
