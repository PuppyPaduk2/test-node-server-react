import { createServer } from "http";
import { createUrlHandler } from "libs/url-handler";
import { urlHandlers } from "libs/infra-app/server";
import { NavigationEntry, NavigationItem } from "../types";

declare const __APP_HREF__: string;
const APP_HREF: string = __APP_HREF__;

declare const __APP_PORT__: string;
const APP_PORT: string = __APP_PORT__;

const navigation: NavigationItem[] = [
  { key: "root", path: "/", parentKey: null, childrenKeys: [] },
  { key: "signIn", path: "/sign-in", parentKey: null, childrenKeys: [] },
  { key: "users", path: "/users/*", parentKey: null, childrenKeys: ["usersAll"] },
  { key: "usersAll", path: "/users/all", parentKey: "users", childrenKeys: [] },
];

const navigationEntries = navigation.reduce<NavigationEntry[]>((memo, item) => {
  memo.push([item.key, {
    path: item.path,
    parentKey: item.parentKey,
    childrenKeys: item.childrenKeys,
  }]);
  return memo;
}, []);

const urlHandler = createUrlHandler({
  paths: [
    {
      url: "/api/navigation/list",
      get: (_, res) => {
        res.end(JSON.stringify(navigationEntries));
      },
    }
  ],
  notFound: urlHandlers.createNotFoundHandler(),
});

const server = createServer(urlHandler);

server.listen(APP_PORT, () => {
  console.log(`Server started on ${APP_HREF}`);
});
