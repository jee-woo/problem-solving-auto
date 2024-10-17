const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
let count = 0;

const columns = new Array(N).fill(false); // 열 검사
const diag1 = new Array(2 * N).fill(false); // 오른쪽 대각선 검사
const diag2 = new Array(2 * N).fill(false); // 왼쪽 대각선 검사

function solve(row) {
  if (row === N) {
    count++;
    return;
  }

  for (let col = 0; col < N; col++) {
    if (columns[col] || diag1[row + col] || diag2[row - col + N]) {
      continue; // 퀸이 공격할 수 있는 위치라면 건너뜀
    }

    columns[col] = diag1[row + col] = diag2[row - col + N] = true; // 현재 위치 사용 표시
    solve(row + 1); // 다음 행으로 이동
    columns[col] = diag1[row + col] = diag2[row - col + N] = false; // 백트래킹 (원상복구)
  }

  // console.log(row);
  // console.table(columns);
}

solve(0);

console.log(count);
