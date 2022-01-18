import React, { memo } from "react";
import { request } from "../../utils/request";
import { useFetch, UseFetchOptions } from "../../utils/use-fetch";
import { MenuItem } from "../../../common/services/main-menu";
import { useRequestMount } from "../../utils/use-request-mount";
import { Link } from "../../utils/link";

const requestMenu = () => {
  return request<MenuItem[]>({ url: "/api/menu"})
    .then(({ data }) => data);
};

const menuOptions: UseFetchOptions<MenuItem[]> = {
  key: "main-menu",
  defaultResult: [],
};

export const MainMenuService = memo(() => {
  const [menu, getMenu] = useFetch(requestMenu, menuOptions);

  useRequestMount(getMenu, menuOptions.key);

  return (
    <div>
      <h2>Main menu</h2>
      <button onClick={getMenu}>Reload menu</button>
      <div>
        {(menu ?? []).map(({ url, text }) => (
          <Link key={url} to={url}>{text}</Link>
        ))}
      </div>
    </div>
  );
});
