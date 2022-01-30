import { Context } from "react";

export type ResultPromise<T> = T extends PromiseLike<infer U> ? U : T;

export type LoaderKey = string;
export type Location = string;

export type Loader<R = any> = {
  path: string;
  defaultValue: R;
  load: () => Promise<R>;
};

export type Loaders<R = any> = {
  [Key: LoaderKey]: Loader<R>;
};

export type Data<L extends Loaders> = {
  [Key in keyof L]: ResultPromise<ReturnType<L[Key]["load"]>>
};

export type PreFetch<L extends Loaders> = {
  (location: Location): Promise<Data<L>>;
  context: Context<Partial<Data<L>>>;
};
