import { clearInterval, setInterval, setTimeout } from "node:timers";

/**
 * Simulates a task that takes time to complete (e.g., processing or a network request).
 */
function simulateTask(taskName: string): void {
  console.log(`${taskName} started at ${new Date().toISOString()}`);
  // Simulate task processing time
  setTimeout(() => {
    console.log(`${taskName} completed at ${new Date().toISOString()}`);
  }, 3000); // Task takes 3 seconds to complete
}

/**
 * Logs a message after a specified delay using setTimeout.
 * @param delay - The delay in milliseconds before the message is logged.
 */
function delayedMessage(delay: number): void {
  setTimeout(() => {
    console.log(`Message logged after ${delay / 1000} second(s)`);
  }, delay);
}

/**
 * Logs a message at regular intervals using setInterval.
 * @param interval - The interval time in milliseconds.
 */
function repeatingMessage(interval: number): void {
  const intervalId = setInterval(() => {
    console.log(`Repeating message every ${interval / 1000} second(s)`);
  }, interval);

  // Automatically stop repeating after 10 seconds
  setTimeout(() => {
    clearInterval(intervalId);
    console.log("Repeating messages stopped.");
  }, 10000);
}

// Example usage

// 1. Call delayedMessage with 5 seconds delay
delayedMessage(5000);

// 2. Call delayedMessage with 2 seconds delay
delayedMessage(2000);

// 3. Call simulateTask to simulate a long-running task
simulateTask("Task 1");
simulateTask("Task 2");

// 4. Call repeatingMessage to log a message every 2 seconds
repeatingMessage(2000);
