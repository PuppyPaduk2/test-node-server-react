import { Dispatch, SetStateAction, useContext, useMemo } from "react";
import { requestsState } from "./requests-state";
import { useIsNeedFirstRequest } from "./use-is-need-first-request";
import { useStore } from "./use-store";

type UseFetchOptions<Result> = {
  key?: string;
  defaultResult?: Result;
};

export function useFetch<Result>(
  request: () => Promise<Result>,
  options: UseFetchOptions<Result> = {}
): [Result, Dispatch<SetStateAction<Result>>] {
  const { key } = options;
  const requests = useContext(requestsState);
  const [result, setResult] = useStore<Result>(options.defaultResult, { key });
  const isNeedFirstRequest = useIsNeedFirstRequest(options.key).current;

  useMemo(() => {
    if (isNeedFirstRequest) {
      requests.add(request()).then((data) => {
        setResult(data);
      });
    }
  }, []);

  return [result, setResult];
}
