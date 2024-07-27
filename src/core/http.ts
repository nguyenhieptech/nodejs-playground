import http from "node:http";

const hostname = "127.0.0.1";
const port = 3333;

// https://nodejs.org/docs/latest/api/http.html#httpcreateserveroptions-requestlistener
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
