import { lookup as lookupMime } from "mime-types";
import { readStatic } from "../utils/read-static";
import { PathHandler } from "../utils/url-handler";

export const client: PathHandler = (req, res, { params }) => {
  const contentType = lookupMime(req.url);

  res.writeHead(200, {
    "Cache-Control": "public, max-age=31536000",
    "Content-Type":  typeof contentType === "string" ? contentType : "text/html",
  });
  readStatic(params[0]).pipe(res);
};