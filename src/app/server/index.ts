import { createServer } from "http";
import { createUrlHandler } from "libs/url-handler";
import { api } from "./api";
import { render } from "./render";
import { notFound } from "./not-found";
import { client } from "./client";

declare const __APP_HREF__: string;
const APP_HREF: string = __APP_HREF__;

declare const __APP_PORT__: string;
const APP_PORT: string = __APP_PORT__;

const urlHandler = createUrlHandler({
  paths: [
    { url: "/favicon.ico", get: notFound },
    { url: "/client/(.*)", get: client },
    { url: "/api/(.*)", get: api },
    { url: "(.*)", get: render },
  ],
  notFound,
});

const server = createServer(urlHandler);

server.listen(APP_PORT, () => {
  console.log(`Server started on ${APP_HREF}`);
});
