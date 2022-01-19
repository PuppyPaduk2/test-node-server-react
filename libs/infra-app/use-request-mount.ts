import { useEffect, useMemo } from "react";
import { useInitialValue } from "./use-initial-value";
import { getSide } from "./get-side";

type Request<Result> = () => Promise<Result>;

const side = getSide();

export function useRequestMount<Result>(request: Request<Result>, key?: string): void {
  const isEmptyValue = useInitialValue((value) => !value, key);

  if (side === "node") {
    useMemo(() => {
      if (isEmptyValue) {
        request();
      }
    }, []);  
  } else if (side === "browser") {
    useEffect(() => {
      if (isEmptyValue) {
        request();
      }
    }, []);
  }
}