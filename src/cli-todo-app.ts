import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline";

const TODO_FILE = join(process.cwd(), "todos.json");

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function loadTodos(): Todo[] {
  if (!existsSync(TODO_FILE)) {
    return [];
  }
  const data = readFileSync(TODO_FILE, "utf-8");
  return JSON.parse(data);
}

function saveTodos(todos: Todo[]): void {
  writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
}

function listTodos(): void {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log("No todos found.");
    return;
  }
  todos.forEach((todo) => {
    console.log(`[${todo.completed ? "x" : " "}] ${todo.id}: ${todo.text}`);
  });
}

function addTodo(text: string): void {
  const todos = loadTodos();
  const newTodo: Todo = {
    id: todos.length ? todos[todos.length - 1]!.id + 1 : 1,
    text,
    completed: false,
  };
  todos.push(newTodo);
  saveTodos(todos);
  console.log(`Added: "${text}"`);
}

function toggleTodo(id: number): void {
  const todos = loadTodos();
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    console.log(`Todo with id ${id} not found.`);
    return;
  }
  todo.completed = !todo.completed;
  saveTodos(todos);
  console.log(`Toggled: "${todo.text}"`);
}

function removeTodo(id: number): void {
  const todos = loadTodos();
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  if (updatedTodos.length === todos.length) {
    console.log(`Todo with id ${id} not found.`);
    return;
  }
  saveTodos(updatedTodos);
  console.log(`Removed todo with id ${id}.`);
}

function showHelp(): void {
  console.log(`
    Todo CLI App:
      Commands:
        list               - List all todos
        add <text>         - Add a new todo
        toggle <id>        - Toggle a todo as completed/incomplete
        remove <id>        - Remove a todo
        help               - Show this help message
  `);
}

function main(): void {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter command: ", (input) => {
    const [command, ...args] = input.trim().split(" ");
    switch (command) {
      case "list":
        listTodos();
        break;
      case "add":
        if (args.length === 0) {
          console.log("Usage: add <text>");
        } else {
          addTodo(args.join(" "));
        }
        break;
      case "toggle":
        if (args.length === 0 || isNaN(Number(args[0]))) {
          console.log("Usage: toggle <id>");
        } else {
          toggleTodo(Number(args[0]));
        }
        break;
      case "remove":
        if (args.length === 0 || isNaN(Number(args[0]))) {
          console.log("Usage: remove <id>");
        } else {
          removeTodo(Number(args[0]));
        }
        break;
      case "help":
        showHelp();
        break;
      default:
        console.log("Unknown command. Type 'help' for available commands.");
    }
    rl.close();
  });
}

main();
