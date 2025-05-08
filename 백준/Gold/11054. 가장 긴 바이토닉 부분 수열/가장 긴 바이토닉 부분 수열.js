// 2025.05.08

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const nums = input[1].split(' ').map(Number);

const dpIncrease = Array(n).fill(1);
const dpDecrease = Array(n).fill(1);

for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (nums[i] > nums[j]) {
      dpIncrease[i] = Math.max(dpIncrease[i], dpIncrease[j] + 1);
    }
  }
}

for (let i = n - 2; i >= 0; i--) {
  for (let j = n - 1; j > i; j--) {
    if (nums[i] > nums[j]) {
      dpDecrease[i] = Math.max(dpDecrease[i], dpDecrease[j] + 1);
    }
  }
}

let max = 0;
for (let i = 0; i < n; i++) {
  max = Math.max(dpIncrease[i] + dpDecrease[i] - 1, max);
}

console.log(max);

// console.table(dpIncrease);
// console.table(dpDecrease);

/*

0~i번째까지 오름차 수열 길이 구하고
i~n-1번째까지 내림차 수열 길이 구해서
최장길이 갱신하기

*/
