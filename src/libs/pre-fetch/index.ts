import { Match, match } from "path-to-regexp";

type ResultPromise<T> = T extends PromiseLike<infer U> ? U : T;

type Loader<R = any> = {
  path: string;
  defaultValue: R;
  load: () => Promise<R>;
};

type LoaderKey = string;

type Loaders<R = any> = {
  [Key: LoaderKey]: Loader<R>;
};

type Params<L extends Loaders> = {
  loaders: L;
};

type Location = string;

type PreFetch<R> = (location: Location) => Promise<R>;

type ResultPreFetch<L extends Loaders> = {
  [Key in keyof L]: ResultPromise<ReturnType<L[Key]["load"]>>
};

export function createPreFetch<L extends Loaders>(params: Params<L>): PreFetch<ResultPreFetch<L>> {
  return async function preFetch(location) {
    const loaders = takeLoaders(params.loaders, location);
    const resultsLoad = await Promise.allSettled(loaders.map(([, { loader }]) => loader.load()));

    return buildResultPreFetch(loaders, resultsLoad);
  }
}

type TakeLoaderResult<L extends Loaders> = [keyof L, { loader: Loader, resultMatch: Match<object> }][];

function takeLoaders<L extends Loaders>(loaders: L, location: Location): TakeLoaderResult<L> {
  const entryLoaders = Object.entries(loaders);
  const result: TakeLoaderResult<L> = [];

  for (let index = 0; index < entryLoaders.length; index += 1) {
    const [key, loader] = entryLoaders[index];
    const matchPath = match(loader.path);
    const resultMatch = matchPath(location);

    if (resultMatch) {
      result.push([key, { loader, resultMatch }]);
    }
  }

  return result;
}

function buildResultPreFetch<L extends Loaders>(
  loaders: TakeLoaderResult<L>,
  resultsLoad: PromiseSettledResult<any>[]
): ResultPreFetch<L> {
  const result: ResultPreFetch<L> = {} as ResultPreFetch<L>;

  for (let index = 0; index < resultsLoad.length; index += 1) {
    const resultLoad = resultsLoad[index];
    const [loaderKey, { loader }] = loaders[index];

    if (resultLoad.status === "fulfilled") {
      result[loaderKey] = resultLoad.value;
    } else {
      result[loaderKey] = loader.defaultValue;
    }
  }

  return result;
}

// const preFetch = createPreFetch({
//   loaders: {
//     root: {
//       path: "(.*)",
//       defaultValue: new Date(),
//       load: async () => new Date(),
//     },
//     users: {
//       path: "/users/(.*)",
//       defaultValue: [],
//       load: () => import("./users").then(({ getUsers }) => getUsers()),
//     },
//   },
// });

// preFetch("").then((data) => {
//   data.root.getTime().toFixed();
//   data.users[0].name;
//   data.users.length;
// });
