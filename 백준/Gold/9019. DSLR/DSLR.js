// 2024.10.04

const fs = require("fs");
// const path = require("path");
// const filePath = path.join(__dirname, "input.txt");
// const input = fs.readFileSync(filePath, "utf-8").trim().split("\n");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const T = Number(input[0]);

const testcases = input.slice(1).map((v) => v.split(" ").map(Number));

const D = (n) => {
  const result = n * 2;
  if (result > 9999) return result % 10000;
  return result;
};
const S = (n) => {
  if (n === 0) return 9999;
  return n - 1;
};
const L = (n) => {
  return ((n * 10) % 10000) + Math.floor(n / 1000);
};
const R = (n) => {
  return (n % 10) * 1000 + Math.floor(n / 10);
};

let answer = "";

for (let i = 0; i < T; i++) {
  const ops = bfs(testcases[i]);
  // console.log(ops);
  answer += ops + "\n";
}

console.log(answer.trim());

function bfs([asIs, toBe]) {
  const queue = [[asIs, ""]];
  const visited = new Array(10000).fill(null).map(() => false);
  visited[asIs] = true;
  let startIdx = 0;
  // while (queue.length > 0) {
  while (startIdx < queue.length) {
    // const [nowNum, nowOp] = queue.shift();
    const [nowNum, nowOp] = queue[startIdx++];

    if (nowNum === toBe) {
      return nowOp;
    }

    const [d, s, l, r] = [D(nowNum), S(nowNum), L(nowNum), R(nowNum)];

    if (!visited[d]) {
      queue.push([d, nowOp + "D"]);
      visited[d] = true;
    }
    if (!visited[s]) {
      queue.push([s, nowOp + "S"]);
      visited[s] = true;
    }
    if (!visited[l]) {
      queue.push([l, nowOp + "L"]);
      visited[l] = true;
    }
    if (!visited[r]) {
      queue.push([r, nowOp + "R"]);
      visited[r] = true;
    }
  }
}
