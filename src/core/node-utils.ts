import util from "node:util";

// https://nodejs.org/docs/latest/api/util.html#utilcallbackifyoriginal

async function fn(): Promise<string> {
  return "hello world";
}

export const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
  if (err) throw err;
  console.log(ret);
});
