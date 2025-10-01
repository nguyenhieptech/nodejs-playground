import fs from "node:fs";
import http from "node:http";
import zlib from "node:zlib";

// https://nodejs.org/docs/latest/api/stream.html#api-for-stream-consumers
// https://www.w3schools.com/nodejs/nodejs_streams.asp

// Almost all Node.js applications, no matter how simple, use streams in some manner.
// The following is an example of using streams in a Node.js application that implements an HTTP server
// $ curl localhost:1337 -d "{}"
// object
// $ curl localhost:1337 -d "\"foo\""
// string
// $ curl localhost:1337 -d "not json"
// error: Unexpected token 'o', "not json" is not valid JSON
// HTTP responses on the client, HTTP requests on the server are readable streams.
// HTTP requests on the client, HTTP responses on the server are writable streams.
// https://github.com/gopinav/Nodejs-Tutorials/blob/master/node-fundamentals/streams.js

const server = http.createServer((req, res) => {
  // `req` is an http.IncomingMessage, which is a readable stream.
  // `res` is an http.ServerResponse, which is a writable stream.

  let body = "";
  // Get the data as utf8 strings.
  // If an encoding is not set, Buffer objects will be received.
  req.setEncoding("utf8");

  // Readable streams emit 'data' events once a listener is added.
  req.on("data", (chunk) => {
    body += chunk;
  });

  // The 'end' event indicates that the entire body has been received.
  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      // Write back something interesting to the user:
      res.write(typeof data);
      res.end();
    } catch (er: any) {
      // uh oh! bad json!
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });
});

server.listen(1337);

const readableStream = fs.createReadStream("./stream-file.txt", {
  encoding: "utf8",
  // highWaterMark determines the size of the internal buffer used by the stream
  // option controls the size of these chunks.
  highWaterMark: 64,
});

const writeableStream = fs.createWriteStream("./stream-file2.txt");

readableStream.on("data", (chunk) => {
  console.log(chunk);
  writeableStream.write(chunk);
});

readableStream.pipe(writeableStream);

const gzip = zlib.createGzip();
readableStream.pipe(gzip).pipe(fs.createWriteStream("./file2.txt.gz"));

readableStream.on("end", () => {
  console.log("Done reading");
});

readableStream.on("err", (err) => {
  console.log(err);
});
