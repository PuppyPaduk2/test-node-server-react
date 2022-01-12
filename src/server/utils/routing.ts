import { IncomingMessage, ServerResponse } from "http";
import { match, MatchFunction } from "path-to-regexp";

export type Handler<Result = void> = (
  req: IncomingMessage,
  res: ServerResponse,
  meta: { params: object }
) => Result;

export type Route = {
  path: string;
  get?: Handler;
  post?: Handler;
};

export type InnerRoute = {
  path: string;
  match: MatchFunction;
  get: Handler;
  post: Handler;
};

export type Config = {
  routes?: Route[];
  notFound?: Handler;
};

export function createRouting(config: Config = {}) {
  const routes = config.routes ?? [];
  const innerRoutes = routes.map<InnerRoute>((item) => ({
    path: item.path,
    match: match(item.path, { decode: decodeURIComponent }),
    get: item.get ?? _notFound,
    post: item.post ?? _notFound,
  }));
  const notFound = config.notFound ?? _notFound;

  return (req: IncomingMessage, res: ServerResponse) => {
    const { route, params } = _matchRoute(innerRoutes, req);
    const handler: Handler | null = route ? route[req.method.toLocaleLowerCase()] : null;

    if (handler) {
      handler(req, res, { params });
    } else {
      notFound(req, res, { params: {} });
    }
  };
}

export function _matchRoute(routes: InnerRoute[], req: IncomingMessage): { route?: InnerRoute; params?: object } {
  for (let index = 0; index < routes.length; index += 1) {
    const route = routes[index];
    const matchResult = route.match(req.url ?? "");

    if (matchResult) {
      return { route, params: matchResult.params ?? {} };
    }
  }

  return {};
}

export function _notFound(req: IncomingMessage, res: ServerResponse): void {
  res.statusCode = 404;
  res.end();
}
