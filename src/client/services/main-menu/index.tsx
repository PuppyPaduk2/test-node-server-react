import React, { memo } from "react";
import { request } from "../../utils/request";
import { useFetch } from "../../utils/use-fetch";

const requestMenu = () => request<object[]>({ url: "/api/menu"})
  .then(({ data }) => data);

export const MainMenuService = memo(() => {
  const [menu] = useFetch(requestMenu, { key: "main-menu" });

  return (
    <div>
      <h2>Main menu</h2>
      <div>{JSON.stringify(menu)}</div>
    </div>
  );
});
