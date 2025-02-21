// 2025.02.21

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, S] = input[0].split(' ').map(Number);
const nums = input[1].split(' ').map(Number);

const solution = () => {
  let min = Number.MAX_SAFE_INTEGER;
  let found = false;

  let s = 0,
    e = 0;
  let sum = nums[0];

  while (true) {
    if (s > e) break;
    if (e >= N) break;

    if (sum < S) {
      e++;
      sum += nums[e];
    } else {
      found = true;
      min = Math.min(min, e - s + 1);
      sum -= nums[s];
      s++;
    }
  }

  if (found) console.log(min);
  else console.log(0);
};

solution();

// console.log(N, S, nums);
