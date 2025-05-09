// 2025.05.08

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);

let board = input.slice(1).map((v) => v.split(''));

let answer = -1;
let min = Number.MAX_SAFE_INTEGER;
let success = false;

const rotate90 = (board) => {
  // console.table(board);
  let newBoard = Array.from({ length: board[0].length }, () =>
    Array(board.length)
  );
  for (let i = 0; i < newBoard.length; i++) {
    for (let j = 0; j < newBoard[0].length; j++) {
      newBoard[i][j] = board[board.length - j - 1][i];
    }
  }
  return newBoard;
  // console.table(newBoard);
};

const tilt = (dir) => {
  let newBoard = board.map((v) => v.slice());
  for (let i = 0; i < dir; i++) {
    newBoard = rotate90(newBoard);
  }

  // 위로 기울이기
  let moved = false;

  let rDropped = false;
  let bDropped = false;
  // blue 빠지면 'B' return
  // red 빠지면 'R' return
  let now;

  for (let i = 1; i < newBoard.length; i++) {
    // let isBreak = false;
    for (let j = 0; j < newBoard[0].length; j++) {
      if (
        newBoard[i][j] === '#' ||
        newBoard[i][j] === '.' ||
        newBoard[i][j] === 'O'
      ) {
        continue;
      }
      now = newBoard[i][j];
      for (let ni = i - 1; ni >= 0; ni--) {
        // 하나씩 올라가면서
        if (newBoard[ni][j] === '.') {
          newBoard[ni][j] = now;
          if (newBoard[ni + 1][j] === now) newBoard[ni + 1][j] = '.';
          moved = true;
        } else if (newBoard[ni][j] === 'O') {
          moved = true;
          if (newBoard[ni + 1][j] === now) newBoard[ni + 1][j] = '.';
          if (now === 'R') {
            rDropped = true;
          } else if (now === 'B') {
            bDropped = true;
          }
          break;
        } else if (newBoard[ni][j] !== now) {
          break;
        }
      }
    }
  }
  // 다시 돌려서 board에 할당
  if (dir > 0) {
    for (let i = 0; i < 4 - dir; i++) {
      newBoard = rotate90(newBoard);
    }
  }
  // console.table(newBoard);
  if (!moved) {
    return -1;
  }
  board = newBoard;
  // return res;

  if (bDropped) {
    return 'B';
  }
  if (rDropped) {
    return 'R';
  }
};

// 0: 북, 1: 서, 2: 남, 3: 동
const recur = (dir, level, history) => {
  // console.log(dir, level, history);
  if (level > 10) {
    return;
  }
  // dir 방향으로 기울이기
  // 만약 파란 구슬이 빠지면 실패
  // 빨간 구슬이 빠지면 min 갱신
  let temp = board.map((v) => v.slice());
  let res = tilt(dir);
  if (res === 'B' || res === -1) {
    // console.log(res, dir, level);
    board = temp;
    return;
  }
  if (res === 'R') {
    // console.log('R', dir, level);
    min = Math.min(min, level);
    // console.log(history);
    success = true;
    board = temp;
    return;
  }

  for (let i = 0; i < 4; i++) {
    if (i === dir || i % 2 === dir % 2) continue;
    res = recur(i, level + 1, [...history, i]);
  }
  board = temp;
};

let tempBoard = board.map((v) => v.slice());

for (let i = 0; i < 4; i++) {
  recur(i, 1, [i]);
  if (i < 3) board = tempBoard;
}

if (success) answer = min;
console.log(answer);
