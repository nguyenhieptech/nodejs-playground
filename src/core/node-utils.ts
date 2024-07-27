// https://nodejs.org/docs/latest/api/util.html#utilcallbackifyoriginal

import util from "node:util";

async function fn(): Promise<string> {
  return "hello world";
}

export const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
  if (err) throw err;
  console.log(ret);
});
