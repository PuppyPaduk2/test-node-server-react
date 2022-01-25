import { request } from "http";
import { createUrlHandler, PathHandler } from "libs/url-handler";
import { MenuItem } from "../common/services/main-menu";
import { urlHandlers } from "libs/infra-app/server";

export const notFound = urlHandlers.createNotFoundHandler();

export const api: PathHandler = createUrlHandler({
  paths: [
    {
      url: "/api/navigation/(.*)",
      get: (req, res) => {
        const proxyRequest = request({
          method: "GET",
          hostname: "localhost",
          port: 3001,
          path: req.url,
        }, (innerRes) => {
          innerRes.on("data", (data) => res.write(data));
          innerRes.on("error", () => {
            res.statusCode = 404;
            res.end();
          });
          innerRes.on('end', () => res.end());
        });

        proxyRequest.on("error", () => {
          res.statusCode = 404;
          res.end();
        });
        proxyRequest.end();
      },
    },
    {
      url: "/api/menu",
      get: (_, res) => {
        const menu: MenuItem[] = [
          { url: "/", text: "Home" },
          { url: "/sign-in", text: "Sign in" },
          { url: "/users/*", text: "Users" },
          { url: "/not-found", text: "Not found" },
        ];

        res.end(JSON.stringify(menu));
      },
    }
  ],
  notFound,
});
