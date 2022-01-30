import { createServer } from "http";
import { parse as parseQuery } from "query-string";
import { createUrlHandler, PathHandler } from "libs/url-handler";
import { MenuEntry, MenuEntryItem, MenuItem, Navigation, NavigationEntry, NavigationEntryItem, NavigationItem } from "../types";

declare const __APP_HREF__: string;
const APP_HREF: string = __APP_HREF__;

declare const __APP_PORT__: string;
const APP_PORT: string = __APP_PORT__;

const toNavigateEntryItem = (item: NavigationItem): NavigationEntryItem => ({
  path: item.path,
  parentKey: item.parentKey,
  childrenKeys: item.childrenKeys,
});

const toMenuEntryItem = (item: MenuItem, navItem: NavigationEntryItem): MenuEntryItem => ({
  path: navItem.path.replace("/*", ""),
  title: item.title,
});

enum navigationKeys {
  root = "root",
  signIn = "signIn",
  users = "users",
  usersAll = "usersAll",
  user = "user",
  notFound = "notFound",
}

const navigationItems: NavigationItem[] = [
  { key: navigationKeys.root, path: "/", parentKey: null, childrenKeys: [] },
  { key: navigationKeys.signIn, path: "/sign-in", parentKey: null, childrenKeys: [] },
  { key: navigationKeys.users, path: "/users/*", parentKey: null, childrenKeys: [navigationKeys.usersAll] },
  { key: navigationKeys.usersAll, path: "/users/all", parentKey: navigationKeys.users, childrenKeys: [] },
  { key: navigationKeys.user, path: "/users/user/:id", parentKey: navigationKeys.users, childrenKeys: [] },
  { key: navigationKeys.notFound, path: "/not-found", parentKey: null, childrenKeys: [] },
];

const navigationEntries = navigationItems.reduce<NavigationEntry[]>((memo, item) => {
  memo.push([item.key, toNavigateEntryItem(item)]);
  return memo;
}, []);

const navigation: Navigation = new Map(navigationEntries);

const mainMenuItem: MenuItem[] = [
  { key: navigationKeys.root, navigationKey: navigationKeys.root, title: "Home" },
  { key: navigationKeys.signIn, navigationKey: navigationKeys.signIn, title: "Sign in" },
  { key: navigationKeys.users, navigationKey: navigationKeys.users, title: "Users" },
  { key: navigationKeys.notFound, navigationKey: navigationKeys.notFound, title: "Not found" },
];

const mainMenuEntries = mainMenuItem.reduce<MenuEntry[]>((memo, item) => {
  const navItem = navigation.get(item.key);

  if (navItem) {
    memo.push([item.key, toMenuEntryItem(item, navItem)]);
  }

  return memo;
}, []);

export const notFound: PathHandler = (_, res) => {
  res.writeHead(404, {
    "Cache-Control": "public, max-age=31536000",
    "Content-Type": "text/html",
  });
  res.end("Not found");
};

const urlHandler = createUrlHandler({
  paths: [
    {
      url: "/api/navigation/list(.*)",
      get: (_, res, { params }) => {
        const { parent } = parseQuery(params[0]);
        let result = navigationEntries;

        if (parent) {
          result = result.filter(([, { parentKey }]) => {
            if (parent === "null") {
              return parentKey === null;
            } else {
              return parentKey === parent;
            }
          });
        }

        res.end(JSON.stringify(result));
      },
    },
    {
      url: "/api/navigation/main-menu",
      get: (_, res) => {
        res.end(JSON.stringify(mainMenuEntries));
      },
    }
  ],
  notFound,
});

const server = createServer(urlHandler);

server.listen(APP_PORT, () => {
  console.log(`Server started on ${APP_HREF}`);
});
