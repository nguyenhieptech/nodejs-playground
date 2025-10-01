import net from "node:net";

const PORT = 4000;
const HOST = "127.0.0.1";

// Create a TCP server
const server = net.createServer((socket) => {
  console.log("Client connected:", socket.remoteAddress, socket.remotePort);
  // Event listener for incoming data from the client
  socket.on("data", (data) => {
    console.log("Received from client:", data.toString());
    // Echo back the data to the client
    socket.write(`Server echo: ${data}`);
  });

  // Event listener for client disconnection
  socket.on("end", () => {
    console.log("Client disconnected");
  });

  // Handle errors
  socket.on("error", (err) => {
    console.error("Socket error:", err.message);
  });
});

// Start the server
server.listen(PORT, HOST, () => {
  console.log(`TCP server is listening on ${HOST}:${PORT}`);
});

// Handle server errors
server.on("error", (err) => {
  console.error("Server error:", err.message);
});
