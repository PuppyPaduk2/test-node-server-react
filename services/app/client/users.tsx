import { createPreFetch } from "libs/pre-fetch";
import React, { FC, memo, useContext, useEffect, useState } from "react";
import { request } from "./utils/request";

console.log("Module (users) loaded");

export const requestUsers = () => request<any[]>({
  method: "GET",
  url: "/api/users",
}).then(({ data }) => data);

export const preFetchUsersData = createPreFetch({
  users: {
    path: "/users*",
    defaultValue: [],
    load: requestUsers,
  },
  auth: {
    path: "/auth",
    defaultValue: {},
    load: () => import("auth/App" as any),
  },
});

const Def = memo(() => <>Loading...</>);

const Content = memo(() => {
  const data = useContext(preFetchUsersData.context);
  const [users, setUsers] = useState<any[]>(data.users);
  const [Auth, setAuth] = useState<FC | null>(Def);

  useEffect(() => {
    if (users.length === 0) {
      requestUsers().then(setUsers);
    }


    import("auth/App" as any).then((m) => setAuth(m.default));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <button onClick={() => requestUsers().then(setUsers)}>Reload</button>
      <button onClick={() => setUsers([])}>Clear</button>
      <div>
        {JSON.stringify(users)}
      </div>

      {Auth ? <Auth /> : null}
    </div>
  );
});

export const Users = memo<typeof preFetchUsersData.defaultData>((props) => {
  useEffect(() => {
    console.log("Users mounted");

    return () => {
      console.log("Users unmounted");
    };
  }, []);

  return (
    <preFetchUsersData.context.Provider value={{ ...props }}>
      <preFetchUsersData.ClearData>
        <Content />
      </preFetchUsersData.ClearData>
    </preFetchUsersData.context.Provider>
  );
});
