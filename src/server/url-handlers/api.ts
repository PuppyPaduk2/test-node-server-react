import { createUrlHandler, PathHandler } from "../utils/url-handler";
import { notFound } from "./not-found";

export const api: PathHandler = createUrlHandler({
  paths: [
    {
      url: "/api/menu",
      get: (_, res) => {
        res.end(JSON.stringify([{ title: "Home" }, { title: "Sign in" }, { title: "Sign up" }]))
      },
    }
  ],
  notFound,
});
