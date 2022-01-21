import { lookup as lookupMime } from "mime-types";
import { readStatic } from "../../../read-static";
import { PathHandler } from "../../../url-handler";

type CreateClientHandlerParams = {
  getPath: (url: string) => string;
};

export function createClientHandler(params: CreateClientHandlerParams): PathHandler {
  const { getPath } = params;

  return (req, res, { params }) => {
    const contentType = lookupMime(req.url);
    const path = getPath(params[0]);
    const stream = readStatic(path);
  
    if (stream) {
      res.writeHead(200, {
        "Cache-Control": "public, max-age=31536000",
        "Content-Type":  typeof contentType === "string" ? contentType : "text/html",
      });
      stream.on("data", (chunk) => res.write(chunk));
      stream.on("end", () => res.end());
    } else {
      res.statusCode = 404;
      res.end();
    }
  };
}
