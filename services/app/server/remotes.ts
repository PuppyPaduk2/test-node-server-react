import { PathHandler } from "libs/url-handler";
import { request } from "http";

export const remotes: PathHandler = (req, res) => {
  const proxyRequest = request({
    method: "GET",
    hostname: "localhost",
    port: 3001,
    // path: req.url,
    path: req.url?.replace("/remotes/auth", ""),
  }, (innerRes) => {
    res.writeHead(innerRes.statusCode ?? 404, innerRes.headers);
    innerRes.pipe(res);
  });

  proxyRequest.on("error", () => {
    res.statusCode = 404;
    res.end();
  });
  proxyRequest.end();
};
