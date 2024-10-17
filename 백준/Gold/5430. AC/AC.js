// 2024.10.17

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// R: 뒤집기. 배열에 있는 수의 순서를 뒤집는 함수
// D: 버리기. 첫번째 수를 버리는 함수, 배열이 비어있을 경우 에러 발생

const T = Number(input[0]);

for (let t = 1; t < input.length; t += 3) {
  const p = input[t].split('');
  const n = Number(input[t + 1]);
  const arr = input[t + 2]
    .slice(1, -1)
    .split(',')
    .filter((v) => v);

  console.log(solution(p, n, arr));
}

function solution(p, n, arr) {
  let direction = true;
  const nowArr = arr.slice();
  for (let i = 0; i < p.length; i++) {
    if (p[i] === 'R') {
      // nowArr.reverse();
      direction = !direction;
    } else if (p[i] === 'D') {
      if (nowArr.length === 0) return 'error';
      if (!direction) nowArr.pop();
      else nowArr.shift();
    }
  }
  if (!direction) {
    return `[${nowArr.reverse().join(',')}]`;
  }
  return `[${nowArr.join(',')}]`;
}
