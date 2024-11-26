// 2024.11.22 ~ 26

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const seats = input.map((v) => v.split('')).flat();
// YYYYY
// SYSYS
// YYYYY
// YSYYS
// YYYYY

// 배열에서 M개를 선택하는 조합 계산
function getCombinations(arr, r) {
  const results = [];
  function backtrack(start, combination, s) {
    if (combination.length === r && s >= 4) {
      results.push([...combination]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      combination.push(i);
      backtrack(i + 1, combination, arr[i] === 'S' ? s + 1 : s);
      combination.pop();
    }
  }
  backtrack(0, [], 0);
  return results;
}

function solution() {
  let answer = 0;

  const bfs = (startRow, startCol, grid) => {
    const queue = [[startRow, startCol]];
    const check = new Array(25).fill(false);
    check[startRow * 5 + startCol] = true;

    let count = 1; // 연결된 좌표 개수
    while (queue.length) {
      const [row, col] = queue.shift();

      const dxdy = [
        [row - 1, col],
        [row, col - 1],
        [row + 1, col],
        [row, col + 1],
      ];

      for (let [dx, dy] of dxdy) {
        if (dx < 0 || dy < 0 || dx >= 5 || dy >= 5) continue;
        if (check[dx * 5 + dy] || grid[dx][dy] === 0) continue;
        check[dx * 5 + dy] = true;
        count++;
        queue.push([dx, dy]);
      }
    }
    return count === 7; // 모든 좌표가 연결되어 있어야 함
  };

  const combination = getCombinations(seats, 7);

  combination.forEach((c) => {
    const grid = Array.from({ length: 5 }, () => Array(5).fill(0));
    c.forEach((v) => {
      grid[Math.floor(v / 5)][v % 5] = 1;
    });

    // BFS로 연결성 확인
    const startRow = Math.floor(c[0] / 5);
    const startCol = c[0] % 5;

    if (bfs(startRow, startCol, grid)) {
      answer++;
    }
  });

  console.log(answer);
}

solution(seats);
