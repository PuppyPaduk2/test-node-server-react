import { ChunkExtractor } from "@loadable/server";
import React from "react";
import { renderToNodeStream, renderToString } from "react-dom/server";
import { Readable } from "stream";
import { App } from "../app";
import { createInitialValuesContextValue } from "../initial-values-context";
import { createRequestContextValue } from "../requests-context";

type RenderAppParams = {
  statsFile: string;
  App: App;
  html: {
    beforeHead: string;
    beforeContent: string;
    beforeFooter: string;
    afterFooter: string;
  };
  entryPoints?: string[];
  location?: string;
};

export async function renderApp(params: RenderAppParams): Promise<Readable> {
  const { statsFile, App, entryPoints, location, html } = params;
  const { beforeHead, beforeContent, beforeFooter, afterFooter } = html;

  const stream = new Readable({ read() {} });
  const webExtractor = new ChunkExtractor({ statsFile, entrypoints: entryPoints });
  const requests = createRequestContextValue();
  const initialValues = createInitialValuesContextValue({ location });
  const collectChunks = () => webExtractor.collectChunks(
    <App requests={requests} initialValues={initialValues} />
  );

  renderToString(collectChunks());
  await requests.promise;

  const renderStream = renderToNodeStream(collectChunks());
  const initialValuesEntries = Object.fromEntries(Array.from(initialValues));
  const initialValuesString = JSON.stringify(initialValuesEntries).replace(/</g, '\\u003c');

  stream.push(beforeHead);
  stream.push(webExtractor.getStyleTags());
  stream.push(webExtractor.getLinkTags());
  stream.push(`<script>window.initialState=${initialValuesString}</script>`);
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

  return stream;
}
