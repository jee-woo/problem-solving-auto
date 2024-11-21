// 2024.11.21

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const city = input.slice(1).map((v) => v.split(' ').map(Number));

const chickens = [];
const houses = [];

// 1: 집, 2: 치킨집
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (city[i][j] === 1) houses.push([i, j]);
    if (city[i][j] === 2) chickens.push([i, j]);
  }
}

// 모든 치킨집 중 M개를 선택하는 조합 계산
function getCombinations(arr, r) {
  const results = [];
  function backtrack(start, combination) {
    if (combination.length === r) {
      results.push([...combination]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      combination.push(arr[i]);
      backtrack(i + 1, combination);
      combination.pop();
    }
  }
  backtrack(0, []);
  return results;
}

// 모든 치킨집 조합
const chickenCombinations = getCombinations(chickens, M);

let minDistance = Number.MAX_SAFE_INTEGER;

// 각 조합에 대해 도시의 최소 치킨 거리 계산
for (const combination of chickenCombinations) {
  let cityDistance = 0;

  for (const [hx, hy] of houses) {
    let houseDistance = Number.MAX_SAFE_INTEGER;

    // 현재 조합의 치킨집들과 거리 계산
    for (const [cx, cy] of combination) {
      const distance = Math.abs(hx - cx) + Math.abs(hy - cy);
      houseDistance = Math.min(houseDistance, distance);
    }

    cityDistance += houseDistance;
  }

  minDistance = Math.min(minDistance, cityDistance);
}

console.log(minDistance);
