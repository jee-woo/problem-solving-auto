// 2025.02.12

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫째 줄에 1번 톱니바퀴의 상태, 둘째 줄에 2번 톱니바퀴의 상태, 셋째 줄에 3번 톱니바퀴의 상태, 넷째 줄에 4번 톱니바퀴의 상태가 주어진다.
// 상태는 8개의 정수로 이루어져 있고, 12시방향부터 시계방향 순서대로 주어진다. N극은 0, S극은 1로 나타나있다.

// 다섯째 줄에는 회전 횟수 K(1 ≤ K ≤ 100)가 주어진다. 다음 K개 줄에는 회전시킨 방법이 순서대로 주어진다.
// 각 방법은 두 개의 정수로 이루어져 있고,
// 첫 번째 정수는 회전시킨 톱니바퀴의 번호, 두 번째 정수는 방향이다. 방향이 1인 경우는 시계 방향이고, -1인 경우는 반시계 방향이다.

const sawTeeth = input.slice(0, 4).map((v) => v.split('').map(Number));
// console.table(sawTooths);

const K = Number(input[4]);
const spins = input.slice(5, 5 + K).map((v) => v.split(' ').map(Number));

// 2 <-> 6 맞닿아 있음

const spinClock = (sNum) => {
  let newST = [sawTeeth[sNum][7], ...sawTeeth[sNum].slice(0, 7)];
  // sawTeeth[sNum] = newST;
  return newST;
};

const spinCounterClock = (sNum) => {
  let newST = [...sawTeeth[sNum].slice(1), sawTeeth[sNum][0]];
  // sawTeeth[sNum] = newST;
  return newST;
};

const spin = (sNum, d) => {
  let newST;
  if (d === 1) newST = spinClock(sNum);
  else newST = spinCounterClock(sNum);
  // console.log('sNum, d:', sNum + 1, d);

  return newST;
};

// side: 회전해야 할 이웃 톱니바퀴. l: left, r: right, b: both
const spinAll = (sNum, d, side) => {
  // console.log('[spinAll] sNum, d, side', sNum, d, side);
  if (sNum < 0 || sNum > 3) return;

  let newST;

  let nd = d === 1 ? -1 : 1;

  switch (side) {
    case 'l':
      if (sNum - 1 < 0) break;
      if (sawTeeth[sNum][6] === sawTeeth[sNum - 1][2]) break;
      // spin(sNum, d);

      spinAll(sNum - 1, nd, 'l');
      break;
    case 'r':
      if (sNum + 1 > 3) break;
      if (sawTeeth[sNum][2] === sawTeeth[sNum + 1][6]) break;
      // spin(sNum, d);

      spinAll(sNum + 1, nd, 'r');
      break;
    case 'b':
      // console.log(
      //   'b, sawTeeth[sNum][6], sawTeeth[sNum - 1][2]',
      //   sawTeeth[sNum][6],
      //   sawTeeth[sNum - 1][2]
      // );

      // 왼쪽 톱니 회전
      if (sNum - 1 >= 0 && sawTeeth[sNum][6] !== sawTeeth[sNum - 1][2]) {
        // spin(sNum, d);

        spinAll(sNum - 1, nd, 'l');
      }
      // 오른쪽 톱니 회전
      if (sNum + 1 <= 3 && sawTeeth[sNum][2] !== sawTeeth[sNum + 1][6]) {
        // spin(sNum, d);

        spinAll(sNum + 1, nd, 'r');
      }
      break;
  }

  newST = spin(sNum, d);
  sawTeeth[sNum] = newST;

  // return newST;
};

// console.table(spins);

for (let [sNum, d] of spins) {
  sNum -= 1;
  let side;
  if (sNum === 0) side = 'r';
  else if (sNum > 0 && sNum < 3) side = 'b';
  else side = 'l';
  spinAll(sNum, d, side);
}

// 점수 계산
let point = 0;
let pp = 1;
for (let i = 0; i < 4; i++) {
  if (sawTeeth[i][0]) point += pp;
  pp = pp * 2;
}

// console.table(sawTeeth);
console.log(point);

// N극은 0, S극은 1

// 1번 톱니바퀴의 12시방향이 N극이면 0점, S극이면 1점
// 2번 톱니바퀴의 12시방향이 N극이면 0점, S극이면 2점
// 3번 톱니바퀴의 12시방향이 N극이면 0점, S극이면 4점
// 4번 톱니바퀴의 12시방향이 N극이면 0점, S극이면 8점
