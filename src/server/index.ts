import { createServer } from "http";
import { createRouting } from "./utils/routing";

const port = 3000;

const routing = createRouting();

const server = createServer((req, res) => {
  console.log("request");
  res.statusCode = 404;
  res.end();
});

server.listen(port, () => {
  console.log("Server started");
});
