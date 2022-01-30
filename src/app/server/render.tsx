import React from "react";
import { createParseHtml } from "libs/parse-html";
import { PathHandler } from "libs/url-handler";
import { resolve as resolvePath } from "path";
import { readFileSync } from "fs";
import { Readable } from "stream";
import { ChunkExtractor } from "@loadable/server";
import { preFetchApp, App } from "../client/app";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { initialStateKey } from "../common/constants";

const indexHtmlPath = resolvePath(__dirname, "../assets/index.html");
const html = readFileSync(indexHtmlPath).toString().replace(/\n/gm, "");
const parseHtml = createParseHtml({
  beforeHead: "{{head}}",
  beforeContent: "{{content}}",
  beforeFooter: "{{footer}}",
});
const parsedHtml = parseHtml(html);

const statsFile = resolvePath(process.cwd(), `./dist/client/loadable-stats.json`);

const entrypoints = ["index"];

const stringify = (value: object): string => {
  return JSON.stringify(value).replace(/</g, '\\u003c');
};

const renderApp = async (params: {
  location: string;
}): Promise<Readable> => {
  const webExtractor = new ChunkExtractor({ statsFile, entrypoints });
  const stream = new Readable({ read() {} });
  const initialState = await preFetchApp(params.location);
  const renderStream = renderToNodeStream(webExtractor.collectChunks(
    <preFetchApp.context.Provider value={initialState}>
      <StaticRouter location={params.location}>
        <App />
      </StaticRouter>
    </preFetchApp.context.Provider>
  ));

  stream.push(parsedHtml.beforeHead);
  stream.push(webExtractor.getStyleTags());
  stream.push(webExtractor.getLinkTags());
  stream.push(`<script>window.${initialStateKey}=${stringify(initialState)}</script>`);
  stream.push(parsedHtml.beforeContent);

  renderStream.on("data", data => stream.push(data));
  renderStream.on("end", () => {
    stream.push(parsedHtml.beforeFooter);
    stream.push(webExtractor.getScriptTags());
    stream.push(parsedHtml.end);
    stream.push(null);
  });

  return stream;
};

export const render: PathHandler = (req, res) => {
  const location = req.url ?? "";

  res.writeHead(200, {
    "Cache-Control": "public, max-age=31536000",
    "Content-Type": "text/html",
  });

  renderApp({ location }).then((stream) => stream.pipe(res));
};
