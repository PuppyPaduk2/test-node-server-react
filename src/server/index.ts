import { createServer } from "http";
import { lookup as lookupMime } from "mime-types";
import { createRouting } from "./utils/routing";
import { indexHtml, render } from "./utils/render";
import { readStatic } from "./utils/read-static";

const port = 3000;

const routing = createRouting({
  routes: [
    {
      path: "/client/(.*)",
      get: (req, res, { params }) => {
        // console.log(params);

        // console.log(__dirname)

        const contentType = lookupMime(req.url);

        res.writeHead(200, {
          "Cache-Control": "public, max-age=31536000",
          "Content-Type":  typeof contentType === "string" ? contentType : "text/html",
        });
        readStatic(params[0]).pipe(res);
        // res.end();
      },
    },
    {
      path: "(.*)",
      get: (_, res) => {
        res.writeHead(200, {
          "Cache-Control": "public, max-age=31536000",
          "Content-Type": "text/html",
        });

        render().pipe(res);
      },
    }
  ],
  notFound: (_, res) => {
    res.writeHead(404, {
      "Cache-Control": "public, max-age=31536000",
      "Content-Type": "text/html",
    });
    res.end(indexHtml.replace("{{content}}", "Not Found"));
  },
});

const server = createServer(routing);

server.listen(port, () => {
  console.log("Server started");
});
