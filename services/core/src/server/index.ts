import { createServer } from "http";
import { notFound, client, api, routing } from "./url-handlers";
import { createUrlHandler } from "../../../../libs/url-handler";

const port = 3000;

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
