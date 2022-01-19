import React, { memo } from "react";
import { request } from "../../utils/request";
import { useFetch, Link } from "../../../../../../libs/infra-app";
import { MenuItem } from "../../../common/services/main-menu";

const requestMenu = () => {
  return request<MenuItem[]>({ url: "/api/menu"})
    .then(({ data }) => data);
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
  const [menu] = useFetch(requestMenu, {
    key: "main-menu",
    defaultResult: [],
    isRequestMount: true,
  });

  const menuItems = menu.map(({ url, text }) => (
    <Link key={url} to={url}>{text}</Link>
  ));

  return <>{menuItems}</>
});
