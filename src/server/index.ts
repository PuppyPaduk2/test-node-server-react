import { createServer } from "http";
import { createRouting } from "./utils/routing";

const port = 3000;

const routing = createRouting({
  routes: [
    {
      path: "/static/(.*)",
      get: (_, res, { params }) => {
        console.log(params);
        res.end();
      },
    }
  ],
});

const server = createServer(routing);

server.listen(port, () => {
  console.log("Server started");
});
