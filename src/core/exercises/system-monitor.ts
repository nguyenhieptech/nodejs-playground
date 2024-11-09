import os from "node:os";

// Function to log system information
function logSystemInfo(): void {
  // Get system architecture (e.g., 'x64')
  console.log(`Architecture: ${os.arch()}`);

  // Get platform (e.g., 'darwin', 'linux', 'win32')
  console.log(`Platform: ${os.platform()}`);

  // Get system uptime (in seconds)
  console.log(`System Uptime: ${os.uptime()} seconds`);

  // Get total system memory (in bytes)
  console.log(`Total Memory: ${os.totalmem()} bytes`);

  // Get free system memory (in bytes)
  console.log(`Free Memory: ${os.freemem()} bytes`);

  // Get the current user's information
  const userInfo = os.userInfo();
  console.log(`Current User: ${userInfo.username}, Home Directory: ${userInfo.homedir}`);

  // Get CPU usage information
  const cpus = os.cpus();
  console.log(`CPU Information:`);
  cpus.forEach((cpu, index) => {
    console.log(`  CPU ${index + 1}: ${cpu.model}`);
    console.log(`    Speed: ${cpu.speed} MHz`);
    console.log(
      `    Times: User - ${cpu.times.user}, Nice - ${cpu.times.nice}, Sys - ${cpu.times.sys}, Idle - ${cpu.times.idle}, IRQ - ${cpu.times.irq}`
    );
  });

  // Get network interfaces
  const networkInterfaces = os.networkInterfaces();
  console.log(`Network Interfaces:`);
  for (const interfaceName in networkInterfaces) {
    networkInterfaces[interfaceName]?.forEach((network) => {
      console.log(`  Interface: ${interfaceName}`);
      console.log(`    Address: ${network.address}`);
      console.log(`    Family: ${network.family}`);
      console.log(`    Internal: ${network.internal}`);
    });
  }
}

// Example usage: Log system information every 5 seconds
setInterval(() => {
  logSystemInfo();
}, 5000);
