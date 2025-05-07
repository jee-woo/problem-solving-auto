const fs = require('fs');
const path = require('path');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m, x, y, k] = input[0].split(' ').map(Number);
const map = input.slice(1, n + 1).map((row) => row.split(' ').map(Number));
const commands = input[n + 1].split(' ').map(Number);

// 주사위의 초기 상태 (각 면의 값)
// [위, 북, 동, 서, 남, 아래] 순서
const dice = [0, 0, 0, 0, 0, 0];

// 현재 위치
let curX = x;
let curY = y;

// 이동 방향 (동서북남)
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const answer = [];

for (const command of commands) {
  // 명령어에 따른 다음 위치 계산
  const nx = curX + dx[command - 1];
  const ny = curY + dy[command - 1];

  // 범위를 벗어나면 무시
  if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

  // 위치 업데이트
  curX = nx;
  curY = ny;

  // 주사위 굴리기
  rollDice(command);

  // 지도와 주사위 상호작용
  if (map[curX][curY] === 0) {
    // 칸이 0이면 주사위 바닥면 복사
    map[curX][curY] = dice[5];
  } else {
    // 칸이 0이 아니면 칸의 수를 주사위 바닥면에 복사하고 칸은 0으로
    dice[5] = map[curX][curY];
    map[curX][curY] = 0;
  }

  // 주사위 윗면 출력
  answer.push(dice[0]);
}

console.log(answer.join('\n'));

// 주사위 굴리기 함수
function rollDice(direction) {
  // 임시 배열에 현재 주사위 상태 복사
  const temp = [...dice];

  // 동쪽으로 굴리기 (1)
  if (direction === 1) {
    dice[0] = temp[3]; // 위 <- 서
    dice[2] = temp[0]; // 동 <- 위
    dice[3] = temp[5]; // 서 <- 아래
    dice[5] = temp[2]; // 아래 <- 동
  }
  // 서쪽으로 굴리기 (2)
  else if (direction === 2) {
    dice[0] = temp[2]; // 위 <- 동
    dice[2] = temp[5]; // 동 <- 아래
    dice[3] = temp[0]; // 서 <- 위
    dice[5] = temp[3]; // 아래 <- 서
  }
  // 북쪽으로 굴리기 (3)
  else if (direction === 3) {
    dice[0] = temp[4]; // 위 <- 남
    dice[1] = temp[0]; // 북 <- 위
    dice[4] = temp[5]; // 남 <- 아래
    dice[5] = temp[1]; // 아래 <- 북
  }
  // 남쪽으로 굴리기 (4)
  else if (direction === 4) {
    dice[0] = temp[1]; // 위 <- 북
    dice[1] = temp[5]; // 북 <- 아래
    dice[4] = temp[0]; // 남 <- 위
    dice[5] = temp[4]; // 아래 <- 남
  }
}
