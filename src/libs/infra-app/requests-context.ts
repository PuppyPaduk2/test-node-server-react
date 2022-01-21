import { createContext } from "react";

export type Requests = {
  stack: Set<Promise<unknown>>;
  promise: Promise<void>;
  finish(): void;
  add<Result = unknown>(
    this: Requests,
    requestPromise: Promise<Result>
  ): Promise<Result>;
};

export function createRequestContextValue(): Requests {
  return {
    stack: new Set(),
    promise: Promise.resolve(),
    finish() {},
    add(requestPromise) {
      if (!this.stack.size) {
        this.promise = new Promise((resolve) => (this.finish = resolve));
      }
  
      this.stack.add(requestPromise);
      requestPromise.finally(() => {
        this.stack.delete(requestPromise);
  
        if (!this.stack.size) {
          this.finish();
        }
      });
  
      return requestPromise;
    },
  };
}

export const requestsContext = createContext<Requests>(createRequestContextValue());

export const RequestsProvider = requestsContext.Provider;
