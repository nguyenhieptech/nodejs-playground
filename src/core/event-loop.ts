// Node.js Tutorials - 43 - Microtask Queues - https://youtu.be/M3sbOSJvhxg
// There are 6 queues in the diagram:
// - Microtask queue (includes nextTick queue and promise queue)
// - Timer queue (setTimeout, setInterval)
// - I/O queue
// - Check queue
// - Close queue
// https://github.com/gopinav/Nodejs-Tutorials/blob/master/node-fundamentals/event-loop.js

// The order of execution you're observing is due to the differences in the event loop behavior between CommonJS (CJS) modules and ES Modules (ESM).
// In ES Modules (ESM), the microtask queue (Promise.resolve().then()) runs before the process.nextTick() queue.
// This is different from the behavior in CommonJS (CJS), where process.nextTick() runs before microtasks.
// Therefore, when running the code with ESM, the order you provided is the correct order of output:

import fs from "node:fs";

// https://www.kindacode.com/article/node-js-using-__dirname-and-__filename-with-es-modules/
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

// ChatGPT Explanation
// Yes, that's correct. The order of execution can indeed vary between CommonJS (CJS) modules and ES Modules (ESM) due to
// differences in how they handle asynchronous operations and the event loop. This is one of the subtle differences that
// can sometimes lead to unexpected behavior when switching between module systems.

// In CommonJS modules, the order of execution is generally:
// process.nextTick()
// Microtask queue (Promise.resolve().then())
// Timer queue (setTimeout())
// I/O queue (fs.readFile())

// In ES Modules (ESM), as you observed:
// Microtask queue (Promise.resolve().then())
// process.nextTick()
// Timer queue (setTimeout())
// I/O queue (fs.readFile())
// These differences arise because of the way the module systems handle
// their internal event loop queues and when they allow specific asynchronous operations to execute.
// Understanding these nuances can be important, especially when working with complex codebase or when transitioning between different module systems.
// It's always a good practice to be aware of the differences and consult relevant documentation when needed.

/** Experiment 1 - all user written JavaScript code takes priority over async code that the runtime would like to execute */
console.log(
  "Experiment 1 - all user written JavaScript code takes priority over async code that the runtime would like to execute"
);
console.log("console.log 1");
process.nextTick(() => console.log("this is process.nextTick 1"));
console.log("console.log 2");

/** Experiment 2 - all callbacks in nextTick queue are executed before all callbacks in promise queue */
console.log(
  "Experiment 2 - all callbacks in nextTick queue are executed before all callbacks in promise queue"
);
process.nextTick(() => console.log("this is process.nextTick 1"));
process.nextTick(() => {
  console.log("this is process.nextTick 2");
  process.nextTick(() => console.log("this is the inner next tick inside next tick"));
});
process.nextTick(() => console.log("this is process.nextTick 3"));

Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
Promise.resolve().then(() => {
  console.log("this is Promise.resolve 2");
  process.nextTick(() => console.log("this is the inner next tick inside Promise then block"));
});
Promise.resolve().then(() => console.log("this is Promise.resolve 3"));

/** Experiment 3 - microtask queues are executed before timer queue */
console.log("Experiment 3 - microtask queues are executed before timer queue");
setTimeout(() => console.log("this is setTimeout 1"), 0);
setTimeout(() => console.log("this is setTimeout 2"), 0);
setTimeout(() => console.log("this is setTimeout 3"), 0);

process.nextTick(() => console.log("this is process.nextTick 1"));
process.nextTick(() => {
  console.log("this is process.nextTick 2");
  process.nextTick(() => console.log("this is the inner next tick inside next tick"));
});
process.nextTick(() => console.log("this is process.nextTick 3"));

Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
Promise.resolve().then(() => {
  console.log("this is Promise.resolve 2");
  process.nextTick(() => console.log("this is the inner next tick inside Promise then block"));
});
Promise.resolve().then(() => console.log("this is Promise.resolve 3"));

/** Experiment 4 - microtask queues are executed in between timer queue callbacks */
console.log("Experiment 4 - microtask queues are executed in between timer queue callbacks");
setTimeout(() => console.log("this is setTimeout 1"), 0);
setTimeout(() => {
  console.log("this is setTimeout 2");
  process.nextTick(console.log.bind(console, "this is the inner next tick inside setTimeout"));
}, 0);
setTimeout(() => console.log("this is setTimeout 3"), 0);

process.nextTick(() => console.log("this is process.nextTick 1"));
process.nextTick(() => {
  console.log("this is process.nextTick 2");
  process.nextTick(console.log.bind(console, "this is the inner next tick inside next tick"));
});
process.nextTick(() => console.log("this is process.nextTick 3"));

Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
Promise.resolve().then(() => {
  console.log("this is Promise.resolve 2");
  process.nextTick(
    console.log.bind(console, "this is the inner next tick inside Promise then block")
  );
});
Promise.resolve().then(() => console.log("this is Promise.resolve 3"));

/** Experiment 5 - timer queue callbacks are executed in FIFO order */
console.log("Experiment 5 - timer queue callbacks are executed in FIFO order");
setTimeout(() => console.log("this is setTimeout 1"), 1000);
setTimeout(() => console.log("this is setTimeout 2"), 500);
setTimeout(() => console.log("this is setTimeout 3"), 0);

/** Experiment 6 - Microtask queues callbacks are executed before I/O queue callbacks */
console.log("Experiment 6 - Microtask queues callbacks are executed before I/O queue callbacks");
fs.readFile(__filename, () => {
  console.log("this is readFile 1");
});

process.nextTick(() => console.log("this is process.nextTick 1"));
Promise.resolve().then(() => console.log("this is Promise.resolve 1"));

/** Experiment 7 - Timer anomaly. Order of execution can never be guaranteed */
console.log("Experiment 7 - Timer anomaly. Order of execution can never be guaranteed");
setTimeout(() => console.log("this is setTimeout 1"), 0);

fs.readFile(__filename, () => {
  console.log("this is readFile 1");
});

/** Experiment 8 - I/O queue callbacks are executed after Microtask queues callbacks and Timer queue callbacks are executed */
console.log(
  "Experiment 8 - I/O queue callbacks are executed after Microtask queues callbacks and Timer queue callbacks are executed"
);
fs.readFile(__filename, () => {
  console.log("this is readFile 1");
});

process.nextTick(() => console.log("this is process.nextTick 1"));
Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
setTimeout(() => console.log("this is setTimeout 1"), 0);

for (let i = 0; i < 200_000_000; i++) {}

/** Experiment 9 - I/O events are polled and callbacks are added only after I/O is complete */
console.log(
  "Experiment 9 - I/O events are polled and callbacks are added only after I/O is complete"
);
fs.readFile(__filename, () => {
  console.log("this is readFile 1");
});

process.nextTick(() => console.log("this is process.nextTick 1"));
Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
setTimeout(() => console.log("this is setTimeout 1"), 0);
setImmediate(() => console.log("this is setImmediate 1"));

for (let i = 0; i < 200_000_000; i++) {}

/** Experiment 10 - Check queue callbacks are executed after Microtask queues callbacks, Timer queue callbacks and I/O queue callbacks are executed */
console.log(
  "Experiment 10 - Check queue callbacks are executed after Microtask queues callbacks, Timer queue callbacks and I/O queue callbacks are executed"
);
fs.readFile(__filename, () => {
  console.log("this is readFile 1");
  setImmediate(() => console.log("this is inner setImmediate inside readFile"));
});

process.nextTick(() => console.log("this is process.nextTick 1"));
Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
setTimeout(() => console.log("this is setTimeout 1"), 0);

for (let i = 0; i < 200_000_000; i++) {}

/** Experiment 11 - Microtask queues callbacks are executed after I/O callbacks and before check queue callbacks */
console.log(
  "Experiment 11 - Microtask queues callbacks are executed after I/O callbacks and before check queue callbacks"
);
fs.readFile(__filename, () => {
  console.log("this is readFile 1");
  setImmediate(() => console.log("this is inner setImmediate inside readFile"));
  process.nextTick(() => console.log("this is inner process.nextTick inside readFile"));
  Promise.resolve().then(() => console.log("this is inner Promise.resolve inside readFile"));
});

process.nextTick(() => console.log("this is process.nextTick 1"));
Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
setTimeout(() => console.log("this is setTimeout 1"), 0);

for (let i = 0; i < 200_000_000; i++) {}

/** Experiment 12 - Microtask queues callbacks are executed in between check queue callbacks */
console.log(
  "Experiment 12 - Microtask queues callbacks are executed in between check queue callbacks"
);
setImmediate(() => console.log("this is setImmediate 1"));
setImmediate(() => {
  console.log("this is setImmediate 2");
  process.nextTick(() => console.log("this is process.nextTick 1"));
  Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
});
setImmediate(() => console.log("this is setImmediate 3"));

/** Experiment 13 - Timer anomaly. Order of execution can never be guaranteed */
console.log("Experiment 13 - Timer anomaly. Order of execution can never be guaranteed");
setTimeout(() => console.log("this is setTimeout 1"), 0);
setImmediate(() => console.log("this is setImmediate 1"));
// Uncomment below to guarantee order
for (let i = 0; i < 1000000000; i++) {}

/** Experiment 14 - Close queue callbacks are executed after all other queues callbacks */
console.log("Experiment 14 - Close queue callbacks are executed after all other queues callbacks");
const readableStream = fs.createReadStream(__filename);
readableStream.close();

readableStream.on("close", () => {
  console.log("this is from readableStream close event callback");
});
setImmediate(() => console.log("this is setImmediate 1"));
setTimeout(() => console.log("this is setTimeout 1"), 0);
Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
process.nextTick(() => console.log("this is process.nextTick 1"));
