import { useCallback, useContext } from "react";
import { requestsContext, useRequestMount } from ".";
import { useStore } from "./use-store";

type Request<Result> = () => Promise<Result>;

export type UseFetchOptions<Result> = {
  key?: string;
  defaultResult?: Result;
  isRequestMount?: boolean;
};

export function useFetch<Result>(
  request: Request<Result>,
  options: UseFetchOptions<Result> = {}
): [Result, Request<Result>] {
  const { key, defaultResult, isRequestMount } = options;
  const requests = useContext(requestsContext);
  const [result, setResult] = useStore<Result>(defaultResult, { key });
  const requestWrapper: Request<Result> = useCallback(() => {
    return requests.add(request()).then((data) => {
      setResult(data);

      return data;
    });
  }, [result]);

  if (isRequestMount) {
    useRequestMount(requestWrapper, key);
  }

  return [result, requestWrapper];
}
