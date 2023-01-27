const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [total, ...commands] = input;
let now;
const queue = [];
let p = 0,
  q = -1;

const print = [];

for (let i = 0; i < total; i++) {
  now = commands[i].trim().split(" ");
  if (now.length === 2) {
    queue.push(now[1]);
    q++;
  } else if (commands[i] === "pop") {
    print.push(queue[p] === undefined ? -1 : queue[p++]);
  } else if (commands[i] === "size") {
    print.push(q - p + 1);
  } else if (commands[i] === "empty") {
    print.push(p > q ? 1 : 0);
  } else if (commands[i] === "front") {
    print.push(p > q ? -1 : queue[p]);
  } else if (commands[i] === "back") {
    print.push(p > q ? -1 : queue[q]);
  }
}

console.log(print.join("\n").trim());
