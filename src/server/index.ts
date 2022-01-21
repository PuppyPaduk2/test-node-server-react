import { createServer } from "http";
import { resolve as resolvePath } from "path";
import { createUrlHandler } from "../libs/url-handler";
import { urlHandlers } from "../libs/infra-app/server";
import { App } from "../client/app";
import { api } from "./api";

const {
  createClientHandler,
  createRoutingHandler,
  createNotFoundHandler,
} = urlHandlers;

declare const __APP_HREF__: string;
const APP_HREF: string = __APP_HREF__;

declare const __APP_PORT__: string;
const APP_PORT: string = __APP_PORT__;

const client = createClientHandler({
  getPath: (url) => resolvePath(__dirname, "../client", url),
});

const routing = createRoutingHandler({
  indexHtmlPath: resolvePath(__dirname, "../public/index.html"),
  statsFile: resolvePath(process.cwd(), `./dist/client/loadable-stats.json`),
  entryPoints: ["index"],
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

server.listen(APP_PORT, () => {
  console.log(`Server started on ${APP_HREF}`);
});
