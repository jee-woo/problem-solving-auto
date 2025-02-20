// 2025.02.20

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 입력을 2차원 배열 board로 변환 (각 자리가 숫자로 변환됨)
const board = input.map((line) => line.split('').map(Number));

/**
 * isValid 함수: board의 [row][col]에 num을 넣었을 때
 * 행, 열, 3x3 블록에 중복된 num이 있는지 검사합니다.
 */
const isValid = (row, col, num) => {
  // 행 검사
  for (let j = 0; j < 9; j++) {
    if (board[row][j] === num) return false;
  }
  // 열 검사
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }
  // 3x3 블록 검사
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
};

// 보드에서 빈 칸(0)의 좌표를 저장 (형태: [row, col])
const blanks = [];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (board[i][j] === 0) {
      blanks.push([i, j]);
    }
  }
}

/**
 * solve 함수: 빈 칸 좌표 목록 blanks의 idx 번째부터 순차적으로 숫자를 채웁니다.
 * 만약 모든 빈 칸을 채웠다면(true를 반환), 완료된 보드를 출력합니다.
 */
const solve = (idx) => {
  // 모든 빈 칸을 채웠으면 스도쿠 완성 → true 반환
  if (idx === blanks.length) return true;

  const [row, col] = blanks[idx];
  for (let num = 1; num <= 9; num++) {
    if (isValid(row, col, num)) {
      board[row][col] = num; // num 배치
      if (solve(idx + 1)) return true; // 다음 빈 칸으로 진행
      board[row][col] = 0; // 실패 시 백트래킹 (복원)
    }
  }
  return false;
};

// 스도쿠 풀이 시작
solve(0);

// 최종 보드를 출력 (각 행을 문자열로 변환하여 줄바꿈)
console.log(board.map((row) => row.join('')).join('\n'));
