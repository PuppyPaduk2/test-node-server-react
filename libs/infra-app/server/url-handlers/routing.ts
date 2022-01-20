import { App } from "../../app";
import { PathHandler } from "../../../url-handler";
import { renderApp } from "../render-app";
import { parseIndexHtml } from "..";

type CreateRoutingHandlerParams = {
  App: App;
  statsFile: string;
  indexHtmlPath: string;
  entryPoints?: string[];
  defaultLocation?: "",
  statusCode?: number;
  headers?: object;
};

export function createRoutingHandler(params: CreateRoutingHandlerParams): PathHandler {
  const { App, statsFile, indexHtmlPath, entryPoints, defaultLocation, statusCode, headers } = params;
  const html = parseIndexHtml(indexHtmlPath);

  return (req, res) => {
    res.writeHead(statusCode ?? 200, {
      "Cache-Control": "public, max-age=31536000",
      "Content-Type": "text/html",
      ...headers,
    });
  
    renderApp({
      location: req.url ?? defaultLocation ?? "",
      html,
      entryPoints,
      App,
      statsFile,
    }).then((stream) => stream.pipe(res));
  };
}