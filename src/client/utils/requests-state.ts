import { createContext } from "react";

export type RequestsState = {
  stack: Set<Promise<unknown>>;
  promise: Promise<void>;
  finish(): void;
  add<Result = unknown>(
    this: RequestsState,
    requestPromise: Promise<Result>
  ): Promise<Result>;
};

export const createRequestState = (): RequestsState => ({
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
});

export const requestsState = createContext<RequestsState>(createRequestState());
