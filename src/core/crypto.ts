import crypto from "node:crypto";
import process from "node:process";

// https://github1s.com/gopinav/Nodejs-Tutorials/blob/master/node-fundamentals/thread-pool.js
// https://nodejs.org/docs/latest/api/crypto.html#cryptopbkdf2password-salt-iterations-keylen-digest-callback
// https://nodejs.org/docs/latest/api/process.html#process

crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString("hex")); // '3745e48...08d59ae'
});

// Thread Pool: https://youtu.be/I1sqnbJ1Fno
const start = Date.now();
crypto.pbkdf2Sync("password", "salt", 100000, 64, "sha512");
crypto.pbkdf2Sync("password", "salt", 100000, 64, "sha512");
crypto.pbkdf2Sync("password", "salt", 100000, 64, "sha512");
console.log("Hash: ", Date.now() - start);

// Thread Pool Size: https://youtu.be/3JYNNf3Iljo
const MAX_CALLS = 4;
const start2 = Date.now();
for (let i = 0; i < MAX_CALLS; i++) {
  crypto.pbkdf2("password", "salt", 100000, 512, "sha512", (err, derivedKey) => {
    console.log(`Hash: ${i + 1}`, Date.now() - start2);
  });
}

process.env.UV_THREADPOOL_SIZE = "5";
