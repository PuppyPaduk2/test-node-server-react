import { createUrlHandler, PathHandler } from "libs/url-handler";
import { MenuItem } from "../common/services/main-menu";
import { urlHandlers } from "libs/infra-app/server";

export const notFound = urlHandlers.createNotFoundHandler();

export const api: PathHandler = createUrlHandler({
  paths: [
    {
      url: "/api/menu",
      get: (_, res) => {
        const menu: MenuItem[] = [
          { url: "/", text: "Home" },
          { url: "/sign-in", text: "Sign in" },
          { url: "/users", text: "Users" },
          { url: "/not-found", text: "Not found" },
        ];

        res.end(JSON.stringify(menu));
      },
    }
  ],
  notFound,
});
