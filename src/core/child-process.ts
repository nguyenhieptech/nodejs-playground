// https://nodejs.org/docs/latest/api/child_process.html

import { spawn } from "node:child_process";

const ls = spawn("ls", ["-lh", "/usr"]);

ls.stdout.on("data", (data) => {
  console.log(`child_process, stdout: ${data}`);
});

ls.stderr.on("data", (data) => {
  console.error(`child_process, stderr: ${data}`);
});

ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
