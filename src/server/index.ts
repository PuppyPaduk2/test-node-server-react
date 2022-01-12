import { createServer } from "http";
import { readFileSync } from "fs";
import { resolve as resolvePath } from "path";
import { lookup as lookupMime } from "mime-types";
import { createRouting } from "./utils/routing";

const port = 3000;

const indexHtml = readFileSync(resolvePath(__dirname, "../public/index.html")).toString();

const routing = createRouting({
  routes: [
    {
      path: "/static/(.*)",
      get: (_, res, { params }) => {
        console.log(params);
        res.end();
      },
    },
  ],
  notFound: (req, res) => {
    const contentType = lookupMime(req.url);

    res.writeHead(404, {
      "Cache-Control": "public, max-age=31536000",
      "Content-Type":  typeof contentType === "string" ? contentType : "text/html",
    });
    res.end(indexHtml.replace("{{content}}", "Not Found"));
  },
});

const server = createServer(routing);

server.listen(port, () => {
  console.log("Server started");
});
