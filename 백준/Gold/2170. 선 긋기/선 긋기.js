// 2025.02.17

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const lines = input
  .slice(1)
  .map((v) => v.split(' ').map(Number))
  .sort((a, b) => a[0] - b[0]);

// console.log(lines);

let start = lines[0][0],
  end = lines[0][1];

let answer = 0;

for (let [s, e] of lines.slice(1)) {
  // 이 선분의 시작점이 마지막 선분의 종료점보다 작거나 같은 경우
  if (s <= end) {
    // 연장
    end = Math.max(e, end);
  }
  // 이 선분의 시작이 마지막 선분의 종료점보다 큰 경우
  else if (s > end) {
    // 새로운 start 갱신, answer에 선분 연결된 크기만큼 추가
    answer += end - start;
    start = s;
    end = e;
  }
}

answer += end - start;

console.log(answer);
