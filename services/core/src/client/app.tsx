import React, { memo } from "react";
import loadable from '@loadable/component'
import { Route, Routes } from "react-router-dom";
import { MainMenuService } from "./services/main-menu";
import { createApp, CommonRouter } from "../../../../libs/infra-app";

const fallback = <div>...loading</div>;

const HomePage = loadable(() => import("./pages/home"), { fallback });

const SingInPage = loadable(() => import("./pages/sing-in"), { fallback });

const UsersService = loadable(() => import("./pages/users"), { fallback });

const Content = memo(() => (
  <>
    <CommonRouter>
      <MainMenuService />

      <Routes>
        <Route path="/">
          <Route path="/" element={<HomePage />} />
          <Route path="sign-in" element={<SingInPage />} />
        </Route>
        <Route path="/users/*" element={<UsersService />} />
        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </CommonRouter>
  </>
));

export const App = createApp(Content);
