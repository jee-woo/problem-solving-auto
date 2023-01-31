const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const num = input[0];

const queue = new Array(num).fill(1).map((_, idx) => idx + 1);
let isThrow = true;
let top;
let p = 0;

while (p < queue.length - 1) {
    top = queue[p++];
    if (!isThrow) queue.push(top);
    isThrow = !isThrow;
}

console.log(queue[p]);