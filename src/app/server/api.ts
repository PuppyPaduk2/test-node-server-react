import { request } from "http";
import { createUrlHandler, PathHandler } from "libs/url-handler";
import { notFound } from "./not-found";

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
    }
  ],
  notFound,
});
