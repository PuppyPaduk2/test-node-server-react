import { createUrlHandler, PathHandler } from "../utils/url-handler";
import { notFound } from "./not-found";
import { MenuItem } from "../../common/services/main-menu";

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
