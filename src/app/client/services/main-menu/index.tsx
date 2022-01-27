import React, { memo } from "react";
import { Link, useFetch, useRequestMount } from "libs/infra-app";
import { request } from "../../utils/request";
import { MenuEntry } from "services/navigation/types";

const requestMainMenu = () => {
  return request<MenuEntry[]>({ url: "/api/navigation/main-menu" })
    .then(({ data }) => data)
    .catch<MenuEntry[]>(() => []);
};

export const MainMenuService = memo(() => (
  <div>
    <h2>Main menu</h2>
    <div>
      <MenuItems />
    </div>
  </div>
));

const MenuItems = memo(() => {
  const [menu, getMenu, menuKey] = useFetch(requestMainMenu, [], "main-menu");

  useRequestMount(getMenu, menuKey);

  const menuItems = menu.map(([key, { path, title }]) => (
    <Link key={key} to={path}>{title}</Link>
  ));

  return <>{menuItems}</>
});
