import { createPreFetch } from "libs/pre-fetch";
import React, { memo, useContext, useState } from "react";
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
});

const Content = memo(() => {
  const data = useContext(preFetchUsersData.context);
  const [users, setUsers] = useState<any[]>(data.users);

  console.log("Users context data:", data);

  return (
    <div>
      <h2>Users</h2>
      <button onClick={() => requestUsers().then(setUsers)}>Reload</button>
      <button onClick={() => setUsers([])}>Clear</button>
      <div>
        {JSON.stringify(users)}
      </div>
    </div>
  );
});

export const Users = memo<typeof preFetchUsersData.defaultData>((props) => {
  return (
    <preFetchUsersData.context.Provider value={{ ...props }}>
      <preFetchUsersData.ClearData>
        <Content />
      </preFetchUsersData.ClearData>
    </preFetchUsersData.context.Provider>
  );
});
