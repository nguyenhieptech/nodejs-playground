import fs from "node:fs"; // https://nodejs.org/docs/latest/api/fs.html#file-system
import zlib from "node:zlib"; // https://nodejs.org/docs/latest/api/zlib.html

const gzip = zlib.createGzip();

const readableStream = fs.createReadStream("./stream-file.txt", {
  encoding: "utf8",
  highWaterMark: 2,
});

const writableStream = fs.createWriteStream("./stream-file2.txt");

readableStream.pipe(writableStream);
