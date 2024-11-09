import { spawn } from "node:child_process";

// Define the command and arguments
const command = process.platform === "win32" ? "dir" : "ls";
const args = process.platform === "win32" ? ["/B"] : ["-lh", "/usr"];

// Spawn the child process
const child = spawn(command, args, { shell: true });

// Capture and print stdout data
child.stdout.on("data", (data: Buffer) => {
  console.log(`stdout: ${data.toString()}`);
});

// Capture and print stderr data
child.stderr.on("data", (data: Buffer) => {
  console.error(`stderr: ${data.toString()}`);
});

// Detect when the child process exits
child.on("close", (code: number) => {
  console.log(`Child process exited with code ${code}`);
});
