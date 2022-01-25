import React, { memo, useMemo } from "react";
import loadable from '@loadable/component'
import { Route, Routes as ReactRoutes } from "react-router-dom";
import { NavigationEntry } from "services/navigation/types";
import { MainMenuService } from "./services/main-menu";
import { createApp, CommonRouter, useFetch } from "libs/infra-app";
import style from "./app.module.scss";
import { request } from "./utils/request";

const fallback = <div>...loading</div>;

const HomePage = loadable(() => import("./pages/home"), { fallback });

const SingInPage = loadable(() => import("./pages/sing-in"), { fallback });

const UsersPage = loadable(() => import("./pages/users"), { fallback });

const serviceMap = {
  root: <HomePage />,
  signIn: <SingInPage />,
  users: <UsersPage />,
};

const requestNavigation = async () => {
  const response = await request<NavigationEntry[]>({ url: "/api/navigation/list" });

  return response.data;
};

const requestNavigationRoot = async () => {
  try {
    const navigation = await requestNavigation();

    return navigation.reduce<NavigationEntry[]>((memo, [key, item]) => {
      if (item.parentKey === null) {
        memo.push([key, item]);
      }

      return memo;
    }, []);
  } catch {
    return [];
  }
};

const Routes = memo(() => {
  const [navigation] = useFetch(requestNavigationRoot, [], {
    key: "navigation",
    isRequestMount: true,
  });

  const routes = navigation.map(([key, { path }]) => (
    <Route key={key} path={path} element={serviceMap[key]} />
  ));

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
