// https://nodejs.org/docs/latest/api/buffer.html

import { Buffer } from "node:buffer";

const buff = Buffer.alloc(8);

buff.write("123456789", "utf-8");

console.log("buffer", buff);

// https://nodejs.org/docs/latest/api/buffer.html#buffers-and-character-encodings
const buf = Buffer.from("hello world", "utf8");

console.log(buf.toString("hex"));
// Prints: 68656c6c6f20776f726c64
console.log(buf.toString("base64"));
// Prints: aGVsbG8gd29ybGQ=
console.log(Buffer.from("fhqwhgads", "utf8"));
// Prints: <Buffer 66 68 71 77 68 67 61 64 73>
console.log(Buffer.from("fhqwhgads", "utf16le"));
// Prints: <Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>
