import v8 from "node:v8";

// https://www.w3schools.com/nodejs/nodejs_v8_engine.asp
// https://nodejs.org/docs/latest/api/v8.html

// Get information about V8's heap memory usage
const heapStats = v8.getHeapStatistics();

console.log("Heap size limit:", (heapStats.heap_size_limit / 1024 / 1024).toFixed(2), "MB");
console.log("Total heap size:", (heapStats.total_heap_size / 1024 / 1024).toFixed(2), "MB");
console.log("Used heap size:", (heapStats.used_heap_size / 1024 / 1024).toFixed(2), "MB");
