import http from "node:http";

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (method === "GET") {
    if (url === "/text") {
      // Respond with plain text
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello, this is plain text response.");
    } else if (url === "/json") {
      // Respond with JSON
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Hello, this is a JSON response." }));
    } else if (url === "/html") {
      // Respond with HTML
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>HTML Response</title>
        </head>
        <body>
          <h1>Hello, this is an HTML response.</h1>
          <p>Welcome to our simple server!</p>
        </body>
        </html>
      `);
    } else {
      // Handle 404 - Not Found
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  } else {
    // Handle other HTTP methods
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end(`Method ${method} not allowed`);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
