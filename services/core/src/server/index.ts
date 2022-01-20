import { createServer } from "http";
import { resolve as resolvePath } from "path";
import { createUrlHandler } from "../../../../libs/url-handler";
import { urlHandlers } from "../../../../libs/infra-app/server";
import { App } from "../client/app";
import { api } from "./api";

const {
  createClientHandler,
  createRoutingHandler,
  createNotFoundHandler,
} = urlHandlers;

const port = 3000;

const client = createClientHandler({
  getPath: (url) => resolvePath(__dirname, "../../../client", url),
});

const routing = createRoutingHandler({
  indexHtmlPath: resolvePath(__dirname, "../../../public/index.html"),
  statsFile: resolvePath(process.cwd(), "./dist/client/services/core/loadable-stats.json"),
  entryPoints: ["services/core/index"],
  App,
});

const notFound = createNotFoundHandler();

const urlHandler = createUrlHandler({
  paths: [
    { url: "/favicon.ico", get: notFound },
    { url: "/client/(.*)", get: client },
    { url: "/api/(.*)", get: api },
    { url: "(.*)", get: routing },
  ],
  notFound,
});

const server = createServer(urlHandler);

server.listen(port, () => {
  console.log("Server started");
});
