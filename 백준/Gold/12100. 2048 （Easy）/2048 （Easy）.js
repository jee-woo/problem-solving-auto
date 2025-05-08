// 2025.05.07

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const board = input.slice(1).map((v) => v.split(' ').map(Number));

let max = 0;

const getMax = (board) => {
  let max = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      max = Math.max(max, board[i][j]);
    }
  }
  return max;
};
//	북	서	남	동
//	0		1		2		3
const rotate90 = (board) => {
  // 90도 회전
  const temp = board.slice().map((v, i) => board[i].slice());
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      board[i][j] = temp[n - j - 1][i];
    }
  }
};
/*
[
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
]

[
	[7, 4, 1],
	[8, 5, 2],
	[9, 6, 3]
]
*/
const swipe = (dir, board) => {
  // 한 방향으로만 구현하고 보드 돌려서 해버리기?
  // 위로 이동만 구현. 위에서부터 순회하면서
  // 1. 위로 올라가면서 같은 번호 만나면 합치기
  // 2. 올라갈 수 있을만큼 올라가기
  for (let i = 0; i < dir; i++) {
    rotate90(board); // 90, 180, 270도 회전
  }

  // 보드 조작
  let num;
  let merged;
  let mergedArr = Array.from({ length: n }, () => Array(n).fill(false));
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 합치면서 올라가거나, 그냥 올라가거나
      if (board[i][j] === 0) continue;
      num = board[i][j];
      merged = 0;
      ni = i;
      nj = j;
      for (let k = i - 1; k >= 0; k--) {
        // 움직인 자리에 숫자가 없는 경우
        if (board[k][j] === 0) {
          ni = k;
          nj = j;
          continue;
        }
        // 이미 합쳐졌거나, 숫자가 다른 경우
        if (mergedArr[k][j] || merged > 0 || board[k][j] !== num) {
          break;
        }
        if (board[k][j] === num) {
          // console.log(k, j, num);
          merged = num * 2;
          ni = k;
          nj = j;
        }
      }
      board[i][j] = 0;
      if (merged) {
        board[ni][nj] = merged;
        mergedArr[ni][nj] = true;
      } else {
        board[ni][nj] = num;
      }
    }
  }

  // 다시 원래대로 회전
  if (dir === 0) {
    return;
  }
  for (let i = 0; i < 4 - dir; i++) {
    rotate90(board);
  }
};

const backtrack = (level, dir, board) => {
  if (level === 5) {
    max = Math.max(max, getMax(board));
    return;
  }
  let newBoard = board.slice().map((v, i) => board[i].slice());
  swipe(dir, newBoard);
  for (let i = 0; i < 4; i++) {
    backtrack(level + 1, i, newBoard);
  }
};

for (let i = 0; i < 4; i++) {
  backtrack(0, i, board);
}
// console.table(board);
// swipe(0, board);
// rotate90(board);
// console.table(board);

console.log(max);
