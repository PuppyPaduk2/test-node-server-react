import { indexHtml } from "../utils/render";
import { PathHandler } from "../utils/url-handler";

export const notFound: PathHandler = (_, res) => {
  res.writeHead(404, {
    "Cache-Control": "public, max-age=31536000",
    "Content-Type": "text/html",
  });
  res.end(indexHtml.replace("{{content}}", "Not Found"));
};
