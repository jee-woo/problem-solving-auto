const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const [ranges, numbers] = [
  input
    .slice(1, N + 1)
    .map((el) => el.split(" ").map((e) => (isNaN(e) ? e : +e))),
  input.slice(N + 1).map(Number),
];

const solution = (n, m, ranges, numbers) => {
  let answer = "";
  for (let i = 0; i < m; i++) {
    answer += ranges[find(numbers[i], n, ranges)][0] + "\n";
  }
  return answer;
};

const find = (target, n, ranges) => {
  let mid = 0,
    low = 0,
    high = n - 1;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (target <= ranges[mid][1]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  if (target > ranges[mid][1]) return mid + 1;
  else return mid;
};

console.log(solution(N, M, ranges, numbers));
