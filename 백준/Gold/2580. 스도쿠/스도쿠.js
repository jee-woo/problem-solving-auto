// 2025.05.08

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const board = input.map((v) => v.split(' ').map(Number));
const N = 9;

const setRowNonExistNum = (r, set) => {
  for (let i = 1; i <= N; i++) {
    if (!board[r].find((v) => v === i)) {
      set.add(i);
    }
  }
};

const setColNonExistNum = (c, set) => {
  for (let i = 1; i <= N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[j][c] === i) {
        break;
      }
      if (j === N - 1) {
        set.add(i);
      }
    }
  }
};

const setSqrNonExistNum = (r, c, set) => {
  // 구간 구하기
  // 0~2 -> 0
  // 3~5 -> 3
  // 6~9 -> 6
  const si = r - (r % 3);
  const sj = c - (c % 3);

  let isPossible = Array(N).fill(true);
  for (let num = 1; num <= N; num++) {
    let isBreak = false;

    for (let i = si; i < si + 3; i++) {
      for (let j = sj; j < sj + 3; j++) {
        if (board[i][j] === num) {
          isBreak = true;
          isPossible[num - 1] = false;
          break;
        }
      }
      if (isBreak) break;
    }
  }
  for (let i = 0; i < isPossible.length; i++) {
    if (isPossible[i]) {
      set.add(i + 1);
    }
  }
};

const findZeroPos = () => {
  for (let ni = 0; ni < N; ni++) {
    for (let nj = 0; nj < N; nj++) {
      if (board[ni][nj] === 0) {
        return [ni, nj];
      }
    }
  }
  return null;
};

// 칸별로
const backtrack = (i, j) => {
  // 해당 행, 열, 3*3 중에서 없는 숫자를 파악하고 모두 겹치는 (가능한) 숫자 목록 만들기
  const rowSet = new Set();
  const colSet = new Set();
  const sqrSet = new Set();
  const possible = [];

  // 행, 열, 3*3 없는 숫자 가져오기
  setRowNonExistNum(i, rowSet);
  setColNonExistNum(j, colSet);
  setSqrNonExistNum(i, j, sqrSet);

  for (let k = 1; k <= N; k++) {
    if (rowSet.has(k) && colSet.has(k) && sqrSet.has(k)) {
      possible.push(k);
    }
  }
  // console.log(possible);
  if (possible.length === 0) {
    return false;
  }

  for (let k = 0; k < possible.length; k++) {
    board[i][j] = possible[k];

    const pos = findZeroPos();
    if (pos === null) {
      return true;
      // break;
      // return false;
    }
    const [x, y] = pos;
    // board[x][y] = possible[k];
    let ok = backtrack(x, y);
    if (ok) {
      // break;
      return true;
    } else {
      board[i][j] = 0;
      continue;
    }
  }

  return false;
};

let found = false;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 0) {
      backtrack(i, j);
      found = true;
      break;
    }
  }
  if (found) break;
}

console.log(board.map((v) => v.join(' ')).join('\n'));
