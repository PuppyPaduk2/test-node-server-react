import { Data, Loader, Loaders } from "./types";

export function buildData<L extends Loaders>(
  params: { loaders: L, rawData: Partial<Data<L>> }
): Data<L> {
  const { loaders, rawData } = params;
  const entries = Object.entries(loaders);
  const result = {} as Data<L>;

  for (let index = 0; index < entries.length; index += 1) {
    const [key, { defaultValue }]: [keyof L, Loader] = entries[index];
    const rawValue = rawData[key];

    result[key] = rawValue ?? defaultValue;
  }

  return result;
}
