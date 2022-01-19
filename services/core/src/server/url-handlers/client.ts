import { lookup as lookupMime } from "mime-types";
import { resolve as resolvePath } from "path";
import { readStatic } from "../../../../../libs/read-static";
import { PathHandler } from "../../../../../libs/url-handler";

export const client: PathHandler = (req, res, { params }) => {
  const contentType = lookupMime(req.url);
  const path = resolvePath(__dirname, "../client", params[0]);
  const stream = readStatic(path);

  res.writeHead(200, {
    "Cache-Control": "public, max-age=31536000",
    "Content-Type":  typeof contentType === "string" ? contentType : "text/html",
  });
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());
};