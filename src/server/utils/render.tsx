import React from "react";
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { Readable } from "stream";
import { resolve as resolvePath } from "path";
import { readFileSync } from "fs";
import { ChunkExtractor } from "@loadable/server";
import { App } from "../../client/app";
import { createRequestState } from "../../client/utils/requests-state";
import { createInitialState } from "../../client/utils/initial-state";

export const indexHtml = readFileSync(resolvePath(__dirname, "../public/index.html")).toString();

let indexHtmlArray = indexHtml.split("{{head}}");
const beforeHead = indexHtmlArray[0];

indexHtmlArray = indexHtmlArray[1].split("{{content}}");
const beforeContent = indexHtmlArray[0];

indexHtmlArray = indexHtmlArray[1].split("{{footer}}");
const beforeFooter = indexHtmlArray[0];
const afterFooter = indexHtmlArray[1];

const clientStats = resolvePath(process.cwd(), "./dist/client/loadable-stats.json");

export function render() {
  const stream = new Readable({
    read() {},
  });

  const webExtractor = new ChunkExtractor({ statsFile: clientStats, entrypoints: ["index"] });
  const requestsState = createRequestState();
  const initialState = createInitialState();
  const jsx = webExtractor.collectChunks(
    <App
      requestState={requestsState}
      initialState={initialState}
    />
  );

  renderToString(jsx);
  requestsState.promise.then(() => {
    const jsx = webExtractor.collectChunks(
      <App
        requestState={requestsState}
        initialState={initialState}
      />
    );
    const renderStream = renderToNodeStream(jsx);
    const initialStateString = JSON.stringify(Object.fromEntries(Array.from(initialState)))
      .replace(/</g, '\\u003c');

    stream.push(beforeHead);
    stream.push(webExtractor.getStyleTags());
    stream.push(webExtractor.getLinkTags());
    stream.push(`<script>window.initialState=${initialStateString}</script>`);
    stream.push(beforeContent);
  
    renderStream.on("data", (data) => stream.push(data));
    renderStream.on("end", () => {
      // console.log(webExtractor.getScriptTags());
      // console.log(webExtractor.getLinkTags());
      // console.log(webExtractor.getStyleTags());
      stream.push(beforeFooter);
      stream.push(webExtractor.getScriptTags());
      stream.push(afterFooter);
      stream.push(null);
    });
  });

  return stream;
}
