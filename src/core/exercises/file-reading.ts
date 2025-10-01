import fs from "node:fs";
import path from "node:path";

const inputFilePath = path.join(__dirname, "input.txt", "utf-8");
const outputFilePath = path.join(__dirname, "output.txt");

// Create readable and writable streams
const readableStream = fs.createReadStream(inputFilePath, {
  encoding: "utf-8",
  highWaterMark: 16 * 1024, // 16 KB chunks
});

const writableStream = fs.createWriteStream(outputFilePath);

// Stream events
readableStream.on("data", (chunk: string) => {
  console.log(`Read chunk: ${chunk.length} bytes`);
  writableStream.write(chunk);
});

readableStream.on("end", () => {
  console.log("Finished reading file.");
  writableStream.end();
});

writableStream.on("finish", () => {
  console.log("Finished writing file.");
});

readableStream.on("error", (err) => {
  console.error("Error reading file:", err.message);
});

writableStream.on("error", (err) => {
  console.error("Error writing file:", err.message);
});
