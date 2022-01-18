import React, { memo, useContext, useEffect } from "react";
import loadable from '@loadable/component'
import { initialState, InitialState } from "./utils/initial-state";
import { requestsState, RequestsState } from "./utils/requests-state";
import { Route, Routes } from "react-router-dom";
import { MainMenuService } from "./services/main-menu";
import { CommonRouter } from "./utils/common-router";

const InitialStateProvider = initialState.Provider;
const RequestsStateProvider = requestsState.Provider;

const fallback = <div>...loading</div>;

const HomePage = loadable(() => import("./pages/home"), { fallback });

const SingInPage = loadable(() => import("./pages/sing-in"), { fallback });

const UsersService = loadable(() => import("./pages/users"), { fallback });

type Props = {
  initialState: InitialState;
  requestState: RequestsState;
};

const ContentWrapper = memo((props) => {
  const { children } = props;
  const initial = useContext(initialState);

  useEffect(() => {
    initial.clear();
  }, []);

  return <>{children}</>;
});

export const App = memo<Props>((props) => {
  return (
    <InitialStateProvider value={props.initialState}>
      <RequestsStateProvider value={props.requestState}>
        <ContentWrapper>
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
        </ContentWrapper>
      </RequestsStateProvider>
    </InitialStateProvider>
  );
});
