// https://github.com/gopinav/Nodejs-Tutorials/blob/master/node-fundamentals/worker-thread.js
// https://nodejs.org/docs/latest/api/worker_threads.html

import { parentPort } from "node:worker_threads";

let total = 0;

// Simulate intensive CPU work with a for loop
for (let i = 0; i < 600_000_000; i++) {
  total++;
}

parentPort?.postMessage(total);
