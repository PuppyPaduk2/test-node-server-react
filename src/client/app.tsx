import React, { memo, useState } from "react";
import loadable from '@loadable/component'
import { initialState, InitialState } from "./utils/initial-state";
import { requestsState, RequestsState } from "./utils/requests-state";

const InitialStateProvider = initialState.Provider;
const RequestsStateProvider = requestsState.Provider;

const LandingPage = loadable(() => import("./pages/landing"), {
  fallback: <div>...loading</div>
});

const SingInPage = loadable(() => import("./pages/sing-in"), {
  fallback: <div>...loading</div>
});

type Props = {
  initialState: InitialState;
  requestState: RequestsState;
};

export const App = memo<Props>((props) => {
  const [landing, setLanding] = useState<boolean>(false);

  return (
    <InitialStateProvider value={props.initialState}>
      <RequestsStateProvider value={props.requestState}>
          <span>App</span>
          <button onClick={() => setLanding(prev => !prev)}>change [{landing ? "true" : "false"}]</button>
          {landing === false && (
            <div>
              <LandingPage />
            </div>
          )}
          {landing === true && (
            <div>
              <SingInPage />
            </div>
          )}
      </RequestsStateProvider>
    </InitialStateProvider>
  );
});
