import { createServer } from "http";

const port = 3000;

const server = createServer((req, res) => {
  console.log("request");
  res.end();
});

server.listen(port, () => {
  console.log("Server started");
});
