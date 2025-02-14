// 2025.02.14

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const nums = input[1].split(' ').map(Number);

// nums[i]: -1,000,000,000 이상 1,000,000,000 이하
// 오름차순 정렬
// nums 숫자들 중 두 숫자를 골라서 더했을 때 0과 가까운 경우

// let answer = [nums[0], nums[N - 1]];
// let min = Math.abs(answer[0] + answer[1]);

let answer = [nums[0], nums[1]];
let min = Number.MAX_SAFE_INTEGER;

// console.log(mid);

let sum = 0;
let abs = 0;
let l = 0,
  r = N - 1;
while (l < r && l >= 0 && r < N) {
  sum = nums[l] + nums[r];
  abs = Math.abs(sum);

  if (abs < min) {
    answer = [nums[l], nums[r]];
    min = abs;
  }
  if (sum === 0) break;

  if (sum > 0) {
    // console.log('sum < 0');
    r--;
  } else {
    // console.log('sum >= 0');
    l++;
  }
}

console.log(answer.sort((a, b) => a - b).join(' '));
