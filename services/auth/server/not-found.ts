import { PathHandler } from "libs/url-handler";

export const notFound: PathHandler = (_, res) => {
  res.writeHead(404, {
    "Cache-Control": "public, max-age=31536000",
    "Content-Type": "text/html",
  });
  res.end("Not found");
};
