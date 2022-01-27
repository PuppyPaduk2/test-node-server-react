import { useCallback, useContext } from "react";
import { requestsContext } from "./requests-context";
import { useStore } from "./use-store";

type Request<Result> = () => Promise<Result>;

export type UseFetchOptions = {
  key?: string;
};

export function useFetch<Result>(
  request: Request<Result>,
  defaultResult: Result,
  key: string
): [Result, Request<Result>, string] {
  const requests = useContext(requestsContext);
  const [result, setResult] = useStore<Result>(defaultResult, key);
  const requestWrapper: Request<Result> = useCallback(() => {
    return requests.add(request()).then((data) => {
      setResult(data);

      return data;
    });
  }, [result]);

  return [result, requestWrapper, key];
}
