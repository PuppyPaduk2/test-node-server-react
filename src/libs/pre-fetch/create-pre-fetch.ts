import { createContext } from "react";
import { buildData } from "./build-data";
import { load } from "./load";
import { Data, Loaders, PreFetch } from "./types";

export function createPreFetch<L extends Loaders>(
  params: { loaders: L }
): PreFetch<L> {
  const { loaders } = params;

  const result: PreFetch<L> = async function preFetch(location) {
    const rawData = await load({ loaders, location });
    const data = buildData({ loaders, rawData });

    return data;
  };

  const defaultValue = buildData({ loaders, rawData: {} });

  result.context = createContext<Partial<Data<L>>>(defaultValue);

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
