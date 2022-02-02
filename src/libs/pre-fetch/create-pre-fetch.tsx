import { match } from "path-to-regexp";
import React, { Context, createContext, FC, memo, useContext, useEffect } from "react";

type Loader<Value> = {
  path: string;
  defaultValue: Value;
  load: (params: {
    location: string;
  }) => Promise<Value>;
};

type Loaders<Data extends object> = {
  [Key in keyof Data]: Loader<Data[Key]>;
};

type PreFetch<Data extends object> = {
  (location: string): Promise<Data>;
  defaultData: Data;
  context: Context<Data>;
  ClearData: FC;
};

export function createPreFetch<Data extends object>(loaders: Loaders<Data>): PreFetch<Data> {
  const preFetch: PreFetch<Data> = async (location) => {
    const rawData = await load({ loaders, location });
    const data = build({ loaders, rawData });

    return data;
  };

  preFetch.defaultData = build({ loaders, rawData: {} });
  preFetch.context = createContext<Data>(preFetch.defaultData);
  preFetch.ClearData = memo((props) => {
    const { children } = props;
    const data = useContext(preFetch.context);

    useEffect(() => {
      for (let key in data) {
        if (({}).hasOwnProperty.call(data, key)) {
          data[key] = preFetch.defaultData[key];
        }
      }
    }, []);

    return <>{children}</>;
  });

  return preFetch;
}

async function load<Data extends object>(params: {
  loaders: Loaders<Data>;
  location: string;
}): Promise<Partial<Data>> {
  const { loaders, location } = params;
  const entries = Object.entries<Loader<any>>(loaders);
  const matchedLoaders: typeof entries = [];
  const promises: Promise<any>[] = [];

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const [, loader] = entry;
    const matchPath = match(loader.path.replace("*", "(.*)"));
    const resultMatch = matchPath(location);

    if (resultMatch) {
      matchedLoaders.push(entry);
      promises.push(loader.load({ location }));
    }
  }

  const results = await Promise.allSettled(promises);
  const rawData: Partial<Data> = {};

  for (let index = 0; index < results.length; index += 1) {
    const result = results[index];
    const [key, { defaultValue }] = matchedLoaders[index];

    if (result.status === "fulfilled") {
      rawData[key] = result.value;
    } else {
      rawData[key] = defaultValue;
    }
  }

  return rawData;
}

function build<Data extends object>(params: {
  loaders: Loaders<Data>;
  rawData: Partial<Data>;
}): Data {
  const { loaders, rawData } = params;
  const entries = Object.entries<Loader<any>>(loaders);
  const data = {} as Data;

  for (let index = 0; index < entries.length; index += 1) {
    const [key, { defaultValue }]= entries[index];

    data[key] = rawData[key] ?? defaultValue;
  }

  return data;
}
