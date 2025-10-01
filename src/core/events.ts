import { EventEmitter } from "node:events";

// https://nodejs.org/docs/latest/api/events.html

// Ideally, we could have an object or some kind of data structures to store our events names for type-safety.
// The naming convention could be decided by the team.
// camelCase, PascalCase, snake_case, param-case, CONSTANT_CASE, etc.
export const EVENT_NAMES = {
  camelCase: "camelCase",
  PascalCase: "PascalCase",
  snake_case: "snake_case",
  ["param-case"]: "param-case",
} as const;

class SimpleEventEmitter extends EventEmitter {}

const simpleEventEmitter = new SimpleEventEmitter();

simpleEventEmitter.on("event", () => {
  console.log("an event occurred!");
});
simpleEventEmitter.emit("event");

// Exercise 1
// https://github.com/gopinav/Nodejs-Tutorials/blob/master/node-fundamentals/built-in-events.js
class OrderEventEmitter extends EventEmitter {}
const orderEvent = new OrderEventEmitter();

orderEvent.on("order-pizza", (size: string, topping: string) => {
  console.log(`Order received! Baking a ${size} pizza with ${topping}`);
});
orderEvent.on("order-pizza", (size: string) => {
  if (size === "large") {
    console.log("Serving complimentary drink");
  }
});
orderEvent.emit("order-pizza", "large", "mushrooms");

type Pizza = {
  size: "sm" | "md" | "lg" | "xl";
  topping: string;
};

const orderEvent2 = new OrderEventEmitter();

orderEvent2.on("order-pizza", (pizza: Pizza) => {
  if (pizza.topping === "none") {
    console.log(`Order received! Baking a ${pizza.size} pizza with no topping`);
    return;
  }
  console.log(`Order received! Baking a ${pizza.size} pizza with ${pizza.topping} topping`);
});

const pizzaOrder1: Pizza = {
  size: "xl",
  topping: "none",
};
orderEvent2.emit("order-pizza", pizzaOrder1);

// Exercise 2
class TransactionEventEmitter extends EventEmitter {}

let transactionCount = 0;

const transactionEvent = new TransactionEventEmitter();

type Transaction = {
  account: number;
  money: number;
  date: Date;
};

transactionEvent.on("payment", (transaction: Transaction) => {
  transactionCount++;
  console.log("transactionTimes: ", transactionCount);
  console.log(
    `Received payment of ${transaction.money} from account ${
      transaction.account
    } in ${transaction.date.toISOString()}`
  );
});

const transaction1: Transaction = {
  account: 1,
  money: 1000,
  date: new Date(),
};
transactionEvent.emit("payment", transaction1);

const transaction2: Transaction = {
  account: 2,
  money: 2000,
  date: new Date(),
};
transactionEvent.emit("payment", transaction2);

const transaction3: Transaction = {
  account: 3,
  money: 3000,
  date: new Date(),
};
transactionEvent.emit("payment", transaction3);

// Exercise 3 (ChatGPT)
// Define the interface for task data
type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const TASK_EVENTS = {
  taskCreated: "task_created",
  taskCompleted: "task_completed",
  taskDeleted: "task_deleted",
} as const;

// Define event payloads
interface TaskCreatedEventPayload {
  task: Task;
}

interface TaskCompletedEventPayload {
  taskId: number;
}

interface TaskDeletedEventPayload {
  taskId: number;
}

// Custom EventManager class to manage task-related events
class TaskManager extends EventEmitter {
  // Method to create a new task
  createTask(task: Task) {
    // Perform task creation logic

    // Emit 'task_created' event with the task data
    this.emit(TASK_EVENTS.taskCreated, { task });
  }

  // Method to mark a task as completed
  completeTask(taskId: number) {
    // Perform task completion logic

    // Emit 'task_completed' event with the task ID
    this.emit(TASK_EVENTS.taskCompleted, { taskId });
  }

  // Method to delete a task
  deleteTask(taskId: number) {
    // Perform task deletion logic

    // Emit 'task_deleted' event with the task ID
    this.emit(TASK_EVENTS.taskDeleted, { taskId });
  }
}

// Usage example
const taskManager = new TaskManager();

// Listen for 'task_created' event
taskManager.on(TASK_EVENTS.taskCreated, ({ task }: TaskCreatedEventPayload) => {
  console.log(`New task created: ${task.title}`);
});

// Listen for 'task_completed' event
taskManager.on(TASK_EVENTS.taskCompleted, ({ taskId }: TaskCompletedEventPayload) => {
  console.log(`Task ${taskId} marked as completed`);
});

// Listen for 'task_deleted' event
taskManager.on(TASK_EVENTS.taskDeleted, ({ taskId }: TaskDeletedEventPayload) => {
  console.log(`Task ${taskId} deleted`);
});

// Create a new task
const newTask: Task = {
  id: 1,
  title: "Complete Node.js project",
  completed: false,
};
taskManager.createTask(newTask);

// Mark task as completed
taskManager.completeTask(1);

// Delete task
taskManager.deleteTask(1);
