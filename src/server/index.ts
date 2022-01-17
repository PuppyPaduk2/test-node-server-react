import { createServer } from "http";
import { lookup as lookupMime } from "mime-types";
import { createUrlHandler, PathHandler } from "./utils/url-handler";
import { indexHtml, render } from "./utils/render";
import { readStatic } from "./utils/read-static";

const port = 3000;

const notFound: PathHandler = (_, res) => {
  res.writeHead(404, {
    "Cache-Control": "public, max-age=31536000",
    "Content-Type": "text/html",
  });
  res.end(indexHtml.replace("{{content}}", "Not Found"));
};

const routing = createUrlHandler({
  paths: [
    {
      url: "/favicon.ico",
      get: notFound,
    },
    {
      url: "/client/(.*)",
      get: (req, res, { params }) => {
        const contentType = lookupMime(req.url);

        res.writeHead(200, {
          "Cache-Control": "public, max-age=31536000",
          "Content-Type":  typeof contentType === "string" ? contentType : "text/html",
        });
        readStatic(params[0]).pipe(res);
      },
    },
    {
      url: "/api/(.*)",
      get: createUrlHandler({
        paths: [
          {
            url: "/api/menu",
            get: (_, res) => {
              res.end(JSON.stringify([{ title: "Home" }, { title: "Sign in" }, { title: "Sign up" }]))
            },
          }
        ],
        notFound,
      }),
    },
    {
      url: "(.*)",
      get: (_, res) => {
        res.writeHead(200, {
          "Cache-Control": "public, max-age=31536000",
          "Content-Type": "text/html",
        });

        render().pipe(res);
      },
    }
  ],
  notFound,
});

const server = createServer(routing);

server.listen(port, () => {
  console.log("Server started");
});
