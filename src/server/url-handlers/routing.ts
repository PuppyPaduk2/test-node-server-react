import { render } from "../utils/render";
import { PathHandler } from "../utils/url-handler";

export const routing: PathHandler = (req, res) => {
  res.writeHead(200, {
    "Cache-Control": "public, max-age=31536000",
    "Content-Type": "text/html",
  });

  render({
    url: req.url,
  }).pipe(res);
};
