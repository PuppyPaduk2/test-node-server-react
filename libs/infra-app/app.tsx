import React, { ComponentClass, FC, memo, useContext, useEffect } from "react";
import { InitialValues, initialValuesContext, InitialValuesProvider } from "./initial-values-context";
import { Requests, RequestsProvider } from "./requests-context";

export type AppProps = {
  requests: Requests;
  initialValues: InitialValues;
};

type Component<Props = {}> = FC<Props> | ComponentClass<Props>;

export type App = Component<AppProps>;

const ContentWrapper = memo((props) => {
  const { children } = props;
  const initialValues = useContext(initialValuesContext);

  useEffect(() => {
    initialValues.clear();
  }, []);

  return <>{children}</>;
});

export function createApp(Content: Component): App {
  return memo((props) => (
    <InitialValuesProvider value={props.initialValues}>
      <RequestsProvider value={props.requests}>
        <ContentWrapper>
          <Content />
        </ContentWrapper>
      </RequestsProvider>
    </InitialValuesProvider>
  ));
}
