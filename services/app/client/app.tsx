import React, { FC, memo, useContext, useEffect, useState } from "react";
import { createPreFetch } from "libs/pre-fetch";
import { Link, Route, Routes, useLocation } from "react-router-dom";

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

const Menu = memo(() => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/users/all">Users all</Link>
    </div>
  )
});

const Users = memo(() => {
  const location = useLocation();
  const { usersData } = useContext(preFetchData.context);
  const Component = preFetchComponents.usePreFetch("Users", location.pathname);

  return <Component {...usersData} />;
});

const Content = memo(() => {
  const { Rules } = useContext(preFetchComponents.context);

  return (
    <>
      <Change />
      <Rules />
      <Routes>
        <Route path="/users/*" element={<Users />} />
      </Routes>
    </>
  );
});

export const App = memo(() => {
  return (
    <div>
      <h1>Application</h1>
      <Menu />
      <Content />
    </div>
  );
});
