import React from "react";
import { resolve as resolvePath } from "path";
import { readFileSync } from "fs";
import { createParseHtml } from "libs/parse-html";
import { Readable } from "stream";
import { PathHandler } from "libs/url-handler";
import { App, preFetchComponents, preFetchData } from "../client/app";
import { renderToString } from "react-dom/server";

const indexHtmlPath = resolvePath(__dirname, "../public/index.html");
const html = readFileSync(indexHtmlPath).toString();
const parseHtml = createParseHtml({
  beforeHead: "{{head}}",
  beforeContent: "{{content}}",
  beforeFooter: "{{footer}}",
});
const parsedHtml = parseHtml(html);

const stringify = (value: object): string => {
  return JSON.stringify(value).replace(/</g, '\\u003c');
};

const renderApp = async (params: {
  location: string;
}): Promise<Readable> => {
  const { location } = params;

  const stream = new Readable({ read() {} });
  const data = await preFetchData(location);
  const components = await preFetchComponents(location);
  const html = renderToString(
    <preFetchData.context.Provider value={data}>
      <preFetchComponents.context.Provider value={components}>
        <App />
      </preFetchComponents.context.Provider>
    </preFetchData.context.Provider>
  );

  stream.push(parsedHtml.beforeHead);
  stream.push(`<script>window.initData=${stringify(data)}</script>`);
  stream.push(parsedHtml.beforeContent);
  stream.push(html);
  stream.push(parsedHtml.beforeFooter);
  stream.push(parsedHtml.end);
  stream.push(null);

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
