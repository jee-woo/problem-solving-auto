const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const stack = [];

for (let i = 1; i < input.length; i++) {
  if (input[i] === 0) {
    stack.pop();
  } else {
    stack.push(input[i]);
  }
}

let sum = 0;
if (stack.length > 0) sum = stack.reduce((acc, cur) => acc + cur);

console.log(sum);
