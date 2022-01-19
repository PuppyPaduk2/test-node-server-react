import { lookup as lookupMime } from "mime-types";
import { resolve as resolvePath } from "path";
import { readStatic } from "../../../../../libs/read-static";
import { PathHandler } from "../../../../../libs/url-handler";

export const client: PathHandler = (req, res, { params }) => {
  const contentType = lookupMime(req.url);
  const path = resolvePath(__dirname, "../client", params[0]);

  res.writeHead(200, {
    "Cache-Control": "public, max-age=31536000",
    "Content-Type":  typeof contentType === "string" ? contentType : "text/html",
  });
  readStatic(path).pipe(res);
};