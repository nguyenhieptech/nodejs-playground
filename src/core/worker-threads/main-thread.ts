// https://github.com/gopinav/Nodejs-Tutorials/blob/master/node-fundamentals/main-thread.js
// https://nodejs.org/docs/latest/api/worker_threads.html

import http from "node:http";
import { Worker } from "node:worker_threads";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home page");
  } else if (req.url === "/slow-page") {
    const worker = new Worker("./worker-thread.ts");

    // receive data (in this case "total") from parentPort!.postMessage(total) line 13
    worker.on("message", (total: number) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Slow Page ${total}`);
    });

    worker.on("error", (err) => {
      console.log(err);
    });
  }
});

server.listen(8000, () => console.log("Server is running on port 8000"));
