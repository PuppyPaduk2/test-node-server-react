import React, { memo, useContext, useMemo } from "react";
import { Link as RouteLink, LinkProps } from "react-router-dom";
import { basenameContext } from "./basename-context";

export const Link = memo<LinkProps>((props) => {
  const { reloadDocument, replace, state, to, children } = props;
  const basename = useContext(basenameContext);
  const toNext = useMemo(() => `${basename}${to}`, [basename, to]);

  return (
    <RouteLink
      reloadDocument={reloadDocument}
      replace={replace}
      state={state}
      to={toNext}
    >
      {children}
    </RouteLink>
  );
});
