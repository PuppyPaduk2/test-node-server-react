import React, { memo, useState } from "react";
import loadable from '@loadable/component'

const LandingPage = loadable(() => import("./pages/landing"), {
	fallback: <div>...loading</div>
});
const SingInPage = loadable(() => import("./pages/sing-in"), {
	fallback: <div>...loading</div>
});

export const App = memo(() => {
  const [state, setState] = useState<boolean>(false);

  return (
    <>
      <h1>App</h1>
      <button onClick={() => setState(prev => !prev)}>change [{state ? "true" : "false"}]</button>
      {state === false && (
        <div>
          <LandingPage />
        </div>
      )}
      {state === true && (
        <div>
          <SingInPage />
        </div>
      )}
    </>
  );
});
