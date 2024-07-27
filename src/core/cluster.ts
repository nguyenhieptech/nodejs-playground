// Node.js Tutorial - 61 - Cluster Module
// https://youtu.be/SHR-KmfRIsU?si=ZnkJ-dDywAarfqHc
// https://github.com/gopinav/Nodejs-Tutorials/blob/master/node-fundamentals/cluster.js
// https://nodejs.org/docs/latest/api/cluster.html

import cluster from "node:cluster";
import http from "node:http";
import os from "node:os";
import process from "node:process";

const PORT = 8000;

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);
  // [10:43] Why shouldn't we simply create a large number of workers using cluster.fork()?
  // We should only create as many workers as there are CPU cores on the machine the app is running.
  // If you create more workers than there are logical cores on the computer,
  // it can cause an overhead as the system will have to schedule all the created workers with fewer number of cores.
  // we can use "os" module to find the number of cores
  // We can use "pm2" package to help with decide the best number of workers to create for your machine
  for (let i = 0; i < os.cpus().length; i++) {
    console.log(`Forking process number ${i}...`);
    cluster.fork(); // creates new node js processes
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork(); // forks a new process if any process dies
  });
} else {
  const server = http.createServer((req, res) => {
    // When we access this index page, it's fast
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Home page");
      // When we access this page, it's slow
    } else if (req.url === "/slow-page") {
      for (let i = 0; i < 60_000_000; i++) {} // Simulate intensive CPU work with a for loop
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Slow Page");
    }
  });

  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

  console.log(`Worker ${process.pid} started`);
}
