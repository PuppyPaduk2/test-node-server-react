import { IncomingMessage, ServerResponse } from "http";
import { match, MatchFunction } from "path-to-regexp";

export type PathHandler<Result = void> = (
  req: IncomingMessage,
  res: ServerResponse,
  meta: { params: object }
) => Result;

export type PathConfig = {
  url: string;
  get?: PathHandler;
  post?: PathHandler;
};

export type Config = {
  paths?: PathConfig[];
  notFound?: PathHandler;
};

export type PathConfigInner = {
  url: string;
  match: MatchFunction;
  get: PathHandler;
  post: PathHandler;
};

export function createUrlHandler(config: Config = {}) {
  const paths = config.paths ?? [];
  const notFound = config.notFound ?? _notFound;
  const pathsInner = paths.map<PathConfigInner>((item) => ({
    url: item.url,
    match: match(item.url, { decode: decodeURIComponent }),
    get: item.get ?? _notFound,
    post: item.post ?? _notFound,
  }));

  return (req: IncomingMessage, res: ServerResponse) => {
    const { path, params } = _matchRoute(pathsInner, req);
    const handler: PathHandler | null = path ? path[req.method?.toLocaleLowerCase() ?? ""] : null;

    if (handler) {
      handler(req, res, { params: params ?? {} });
    } else {
      notFound(req, res, { params: {} });
    }
  };
}

export function _matchRoute(paths: PathConfigInner[], req: IncomingMessage): { path?: PathConfigInner; params?: object } {
  for (let index = 0; index < paths.length; index += 1) {
    const path = paths[index];
    const matchResult = path.match(req.url ?? "");

    if (matchResult) {
      return { path, params: matchResult.params ?? {} };
    }
  }

  return {};
}

export function _notFound(req: IncomingMessage, res: ServerResponse): void {
  res.statusCode = 404;
  res.end();
}