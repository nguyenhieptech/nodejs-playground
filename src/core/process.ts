import process from "node:process";

// https://nodejs.org/docs/latest/api/process.html#process

process.env.UV_THREADPOOL_SIZE = "5";

process.on("beforeExit", (code) => {
  console.log("Process beforeExit event with code: ", code);
});

process.on("exit", (code) => {
  console.log("Process exit event with code: ", code);
});

console.log("This message is displayed first.");

// Prints:
// This message is displayed first.
// Process beforeExit event with code: 0
// Process exit event with code: 0
