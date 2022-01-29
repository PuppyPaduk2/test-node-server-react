import React, { memo } from "react";
import loadable from "@loadable/component";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import { NavigationEntry } from "services/navigation/types";
import { MainMenuService } from "./services/main-menu";
import { createApp, CommonRouter, useFetch, useRequestMount } from "libs/infra-app";
import style from "./app.module.scss";
import { request } from "./utils/request";
import { createPreFetch } from "libs/pre-fetch";

const fallback = <div>...loading</div>;

const HomePage = loadable(() => import("./pages/home"), { fallback });

const SingInPage = loadable(() => import("./pages/sing-in"), { fallback });

const UsersPage = loadable(() => import("./pages/users"), { fallback });

const elementMap = {
  root: <HomePage />,
  signIn: <SingInPage />,
  users: <UsersPage />,
};

const requestNavigation = async () => {
  try {
    const { data } = await request<NavigationEntry[]>({ url: "/api/navigation/list", params: { parent: "null" } });

    return data;
  } catch {
    return [];
  }
};

const Routes = memo(() => {
  const [navigation, getNavigation, navigationKey] = useFetch(requestNavigation, [], "navigation-app");

  useRequestMount(getNavigation, navigationKey);

  const routes = navigation.reduce<JSX.Element[]>((memo, [key, { path }]) => {
    const element = elementMap[key];

    if (element) {
      memo.push(<Route key={key} path={path} element={element} />);
    }

    return memo;
  }, []);

  return (
    <ReactRoutes>
      {routes}
      <Route path="*" element={<>Not Found</>} />
    </ReactRoutes>
  );
});

const Content = memo(() => (
  <div className={style.app}>
    <CommonRouter>
      <MainMenuService />
      <Routes />
    </CommonRouter>
  </div>
));

export const App = createApp(Content);

export const preFetch = createPreFetch({
  loaders: {
    root: {
      path: "(.*)",
      defaultValue: {},
      load: () => Promise.resolve({}),
    },
    signIn: {
      path: "/sign-in",
      defaultValue: {},
      load: () => Promise.resolve({}),
    },
    users: {
      path: "/users/(.*)",
      defaultValue: [],
      load: () => import("./pages/users")
        .then(({ requestNavigationUsers }) => requestNavigationUsers()),
    },
    usersAll: {
      path: "/users/all",
      defaultValue: { users: [] },
      load: () => Promise.reject({}),
    },
    user: {
      path: "/users/user/:id",
      defaultValue: {},
      load: () => Promise.resolve({}),
    },
    rules: {
      path: "",
      defaultValue: {},
      load: () => Promise.resolve({}),
    },
  },
});
