import { useContext, useRef } from "react";
import { initialState } from "./initial-state";

export function useIsNeedFirstRequest(key?: string): React.MutableRefObject<boolean> {
  const initial = useContext(initialState);

  return useRef<boolean>(key ? !initial.has(key) : true);
}
