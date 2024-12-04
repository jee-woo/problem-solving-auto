// 2024.12.04

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = Number(input[0]);

const solution = (nums) => {
  let sum = 0;
  const visited = new Array(nums.length + 1).fill(-1);
  const selected = new Array(nums.length + 1).fill(false);

  const dfs = (start, num, len, way) => {
    if (num === start) {
      sum += len;
      return;
    }
    if (visited[num] > 0) {
      if (selected[num]) {
        // console.table(visited);
        sum += len - visited[num];
        // console.log('way', way);
        // console.log('num, len, sum', num, len, sum);
      }
      return;
    }

    visited[num] = len;
    selected[num] = true;
    dfs(start, nums[num - 1], len + 1, `${way} ${nums[num - 1]}`);
    selected[num] = false;
  };

  for (let i = 1; i <= nums.length; i++) {
    if (visited[i] > 0) continue;
    visited[i] = 1;
    dfs(i, nums[i - 1], 1, `${i} ${nums[i - 1]}`);
  }

  console.log(nums.length - sum);
};

let idx = 2;
while (true) {
  if (idx >= input.length) break;
  const numbers = input[idx].split(' ').map(Number);
  solution(numbers);
  idx += 2;
}
