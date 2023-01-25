const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const [num, ...sequence] = input;
let p = 0;
const stack = [];
const result = [];

for (let i = 1; i <= num; i++) {
  stack.push(i);
  result.push("+");
  while (true) {
    if (
      stack.at(-1) === sequence[p] &&
      stack.length > 0 &&
      p < sequence.length
    ) {
      stack.pop();
      result.push("-");
      p++;
    } else {
      break;
    }
  }
}

if (stack.length > 0) console.log("NO");
else console.log(result.join("\n"));
