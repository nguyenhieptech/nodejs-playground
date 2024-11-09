import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";

if (isMainThread) {
  // Main thread: spawn a worker to perform the Fibonacci calculation
  const number = 40; // The nth Fibonacci number to calculate

  const worker = new Worker(__filename, {
    workerData: number,
  });

  worker.on("message", (result) => {
    console.log(`Fibonacci result for ${number}: ${result}`);
  });

  worker.on("error", (error) => {
    console.error("Worker error:", error);
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Worker exited with code ${code}`);
    } else {
      console.log("Worker completed successfully.");
    }
  });
} else {
  // Worker thread: perform the Fibonacci calculation
  function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  const result = fibonacci(workerData);
  parentPort?.postMessage(result);
}
