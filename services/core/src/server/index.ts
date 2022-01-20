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

declare const __SERVICE_HREF__: string;
const SERVICE_HREF: string = __SERVICE_HREF__;

declare const __SERVICE_PORT__: string;
const SERVICE_PORT: string = __SERVICE_PORT__;

declare const __SERVICE_NAME__: string;
const SERVICE_NAME: string = __SERVICE_NAME__;

const client = createClientHandler({
  getPath: (url) => resolvePath(__dirname, "../../../client", url),
});

const routing = createRoutingHandler({
  indexHtmlPath: resolvePath(__dirname, "../../../public/index.html"),
  statsFile: resolvePath(process.cwd(), `./dist/client/services/${SERVICE_NAME}/loadable-stats.json`),
  entryPoints: [`services/${SERVICE_NAME}/index`],
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

server.listen(SERVICE_PORT, () => {
  console.log(`Server started on ${SERVICE_HREF}`);
});
