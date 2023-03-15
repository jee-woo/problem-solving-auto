const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const elements = input[1].split(" ").map(Number);

const solution = (k) => {
  let countArr = new Array(100000).fill(0);

  let elLength = elements.length;
  let max = 0;
  let lt = 0,
    rt = 0;
  while (rt < elLength) {
    if (countArr[elements[rt]] >= k) {
      countArr[elements[lt]]--;
      lt++;
    } else {
      countArr[elements[rt]]++;
      rt++;
    }

    max = Math.max(max, rt - lt);
  }

  return max;
};

console.log(solution(K));
