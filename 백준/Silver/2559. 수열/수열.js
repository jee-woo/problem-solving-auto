const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, X] = input[0].split(" ").map(Number);
const temperatures = input[1].split(" ").map(Number);

const solution = (x, temperatures) => {
  let sum = temperatures.slice(0, x).reduce((prev, cur) => prev + cur);
  let max = sum;

  for (let i = 0; i + x < temperatures.length; i++) {
    sum = sum - temperatures[i] + temperatures[i + x];
    max = Math.max(max, sum);
  }

  return max;
};

console.log(solution(X, temperatures));
