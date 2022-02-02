import { Match, match } from "path-to-regexp";
import React, { Context, createContext, FC, memo, useContext, useEffect, useState } from "react";

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

type Loaded<Data extends object> = {
  [Key in keyof Data]: boolean;
};

type MatchLoader<Data extends object> = {
  <Key extends keyof Data>(key: Key, location: string): Match<object>;
}

type Load<Data extends object> = {
  <Key extends keyof Data>(key: Key, location: string): Promise<Data[Key]>;
};

type UsePreFetch<Data extends object> = {
  <Key extends keyof Data>(key: Key, location: string): Data[Key];
};

type PreFetch<Data extends object> = {
  (location: string): Promise<Data>;
  loaderKeys: (keyof Data)[];
  loaded: Loaded<Data>;
  defaultData: Data;
  match: MatchLoader<Data>;
  load: Load<Data>;

  context: Context<Data>;
  ClearData: FC;
  usePreFetch: UsePreFetch<Data>;
};

export function createPreFetch<Data extends object>(loaders: Loaders<Data>): PreFetch<Data> {
  const preFetch: PreFetch<Data> = async (location) => {
    const rawData = await load({ preFetch, location });
    const data = { ...preFetch.defaultData, ...rawData };

    return data;
  };

  preFetch.loaderKeys = Object.keys(loaders) as (keyof Data)[];
  preFetch.loaded = Object.fromEntries(
    preFetch.loaderKeys.map((key) => [key, false])
  ) as Loaded<Data>;
  preFetch.defaultData = Object.fromEntries(
    preFetch.loaderKeys.map((key) => [key, loaders[key].defaultValue])
  ) as Data;
  preFetch.match = (key, location) => {
    const { path } = loaders[key];
    const matchPath = match(path.replace("*", "(.*)"));

    return matchPath(location);
  };
  preFetch.load = async (key, location) => {
    const { load } = loaders[key];
    const value = await load({ location });

    preFetch.loaded[key] = true;

    return value;
  };

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
  preFetch.usePreFetch = (key, location) => {
    const context = useContext(preFetch.context);
    const [value, setValue] = useState<Data[typeof key]>(context[key]);

    useEffect(() => {
      if (preFetch.loaded[key] === false) {
        preFetch.load(key, location).then(setValue);
      }
    }, [key, location]);

    return value;
  };

  return preFetch;
}

async function load<Data extends object>(params: {
  preFetch: PreFetch<Data>;
  location: string;
}): Promise<Partial<Data>> {
  const { preFetch, location } = params;
  const { loaderKeys, match, load } = preFetch;
  const rawData: Partial<Data> = {};
  const promises: Promise<any>[] = [];

  for (let index = 0; index < loaderKeys.length; index += 1) {
    const key = loaderKeys[index];

    if (match(key, location)) {
      const promise = load(key, location);

      promise.then((rawValue) => {
        rawData[key] = rawValue;
      });

      promises.push(promise);
    }
  }

  await Promise.allSettled(promises);

  return rawData;
}
