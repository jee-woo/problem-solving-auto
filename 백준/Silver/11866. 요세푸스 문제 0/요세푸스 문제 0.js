const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let answer = [];
let queue = Array.from({ length: input[0] }, (_, i) => i + 1);
while (queue.length) {
  for (let i = 1; i < input[1]; i++) queue.push(queue.shift());
  answer.push(queue.shift());
  if (queue.length === 1) answer.push(queue.shift());
}

console.log(`<${answer.join(", ")}>`);
