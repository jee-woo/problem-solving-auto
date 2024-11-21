// 2024.11.20

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const inputEggs = input.slice(1).map((v) => v.split(' ').map(Number));

solution(inputEggs);

function solution(arr) {
  let max = 0;
  const check = new Array(N).fill(false);
  // 0: 내구도, 1: 무게
  const backtrack = (eggs, handEggIdx, brokenEgg) => {
    // console.log(handEggIdx, eggs.join(' | '), brokenEgg);
    max = Math.max(max, brokenEgg);

    // (3. 단, 가장 최근에 든 계란이 가장 오른쪽에 위치한 계란일 경우 계란을 치는 과정을 종료한다.)
    if (handEggIdx >= N) {
      return;
    }

    if (eggs[handEggIdx][0] <= 0) {
      backtrack(eggs, handEggIdx + 1, brokenEgg);
      return;
    }

    // 2. 손에 들고 있는 계란으로 깨지지 않은 다른 계란 중에서 하나를 친다.
    //    단, 손에 든 계란이 깨졌거나 깨지지 않은 다른 계란이 없으면 치지 않고 넘어간다.
    //    이후 손에 든 계란을 원래 자리에 내려놓고 3번 과정을 진행한다.
    for (let i = 0; i < N; i++) {
      // if (check[i] || i === handEggIdx || eggs[i][0] <= 0) continue;
      if (i === handEggIdx || eggs[i][0] <= 0) continue;

      const [handEggDurability, handEggWeight] = eggs[handEggIdx];
      const [eggDurability, eggWeight] = eggs[i];

      const prevHandEggDur = eggs[handEggIdx][0];
      const prevEggDur = eggs[i][0];

      eggs[handEggIdx][0] = handEggDurability - eggWeight;
      eggs[i][0] = eggDurability - handEggWeight;

      let newBrokenEgg = brokenEgg;
      if (eggs[i][0] <= 0) newBrokenEgg += 1;
      if (eggs[handEggIdx][0] <= 0) newBrokenEgg += 1;

      // 3. 가장 최근에 든 계란의 한 칸 오른쪽 계란을 손에 들고 2번 과정을 다시 진행한다.
      // check[i] = true;
      backtrack(eggs, handEggIdx + 1, newBrokenEgg);

      eggs[handEggIdx][0] = prevHandEggDur;
      eggs[i][0] = prevEggDur;
      // check[i] = false;
    }
  };

  // 1. 가장 왼쪽의 계란을 든다.
  backtrack(arr, 0, 0);

  console.log(max);
}
