// 2025.02.17

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const lines1 = input.slice(1).map((v) => v.split(' ').map(Number));
const lines2 = input.slice(1).map((v) => v.split(' ').reverse().map(Number));

const lines = [...lines1, ...lines2].sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1];
  return a[0] - b[0];
});

let end = lines1[0][1];

let answer = 1;
let count = 1;

for (let [s, e] of lines.slice(1)) {
  if (s === e) continue;
  // start, end
  if (s < e) {
    // 이 선분의 시작점이 마지막 선분의 종료점보다 작은 경우
    if (s < end) {
      end = Math.max(e, end);
      count++;
    }
    // 이 선분의 시작이 마지막 선분의 종료점보다 큰 경우
    else if (s >= end) {
      count++;
      end = e;
    }
  }
  // end, start
  else {
    count--;
  }
  answer = Math.max(count, answer);
}

console.log(answer);
