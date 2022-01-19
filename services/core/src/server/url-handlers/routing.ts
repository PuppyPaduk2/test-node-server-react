import { resolve as resolvePath } from "path";
import { readFileSync } from "fs";
import { renderApp } from "../../../../../libs/infra-app/server";
import { PathHandler } from "../../../../../libs/url-handler";
import { App } from "../../client/app";

export const indexHtml = readFileSync(resolvePath(__dirname, "../public/index.html")).toString();

let indexHtmlArray = indexHtml.split("{{head}}");
const beforeHead = indexHtmlArray[0];

indexHtmlArray = indexHtmlArray[1].split("{{content}}");
const beforeContent = indexHtmlArray[0];

indexHtmlArray = indexHtmlArray[1].split("{{footer}}");
const beforeFooter = indexHtmlArray[0];
const afterFooter = indexHtmlArray[1];

const statsFile = resolvePath(process.cwd(), "./dist/client/loadable-stats.json");

export const routing: PathHandler = (req, res) => {
  res.writeHead(200, {
    "Cache-Control": "public, max-age=31536000",
    "Content-Type": "text/html",
  });

  renderApp({
    location: req.url ?? "",
    html: { beforeHead, beforeContent, beforeFooter, afterFooter },
    entryPoints: ["index"],
    App,
    statsFile,
  }).then((stream) => stream.pipe(res));
};
