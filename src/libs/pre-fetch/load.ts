import { match } from "path-to-regexp";
import { Location, Data, Loaders, Loader } from "./types";

export async function load<L extends Loaders>(
  params: { loaders: L, location: Location }
): Promise<Partial<Data<L>>> {
  const { loaders, location } = params;
  const entries = Object.entries(loaders);
  const loaderKeys: [keyof L, Loader][] = [];
  const promises: Promise<any>[] = [];

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const [, loader] = entry;
    const matchPath = match(loader.path);
    const resultMatch = matchPath(location);

    if (resultMatch) {
      loaderKeys.push(entry);
      promises.push(loader.load());
    }
  }

  const loadResults = await Promise.allSettled(promises);
  const result: Partial<Data<L>> = {};

  for (let index = 0; index < loadResults.length; index += 1) {
    const loadResult = loadResults[index];
    const [key, { defaultValue }] = loaderKeys[index];

    if (loadResult.status === "fulfilled") {
      result[key] = loadResult.value;
    } else {
      result[key] = defaultValue;
    }
  }

  return result;
};
