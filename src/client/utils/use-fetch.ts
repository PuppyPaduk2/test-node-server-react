import { useCallback, useContext } from "react";
import { requestsState } from "./requests-state";
import { useStore } from "./use-store";

type Request<Result> = () => Promise<Result>;

export type UseFetchOptions<Result> = {
  key?: string;
  defaultResult?: Result;
};

export function useFetch<Result>(
  request: Request<Result>,
  options: UseFetchOptions<Result> = {}
): [Result, Request<Result>] {
  const { key, defaultResult } = options;
  const requests = useContext(requestsState);
  const [result, setResult] = useStore<Result>(defaultResult, { key });
  const requestWrapper: Request<Result> = useCallback(() => {
    return requests.add(request()).then((data) => {
      setResult(data);

      return data;
    });
  }, [result]);

  return [result, requestWrapper];
}
