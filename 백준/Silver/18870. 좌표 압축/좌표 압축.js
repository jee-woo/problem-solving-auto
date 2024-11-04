// 2024.11.04

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);

const nums = input[1].split(' ').map(Number);
const numsSet = new Set(nums);
const noDupNums = Array.from(numsSet);

const sortedNums = noDupNums.sort((a, b) => a - b);

const sortedMap = new Map();

sortedNums.forEach((v, i) => {
  if (!sortedMap.has(v)) sortedMap.set(v, i);
});

const str = nums.reduce((prev, cur) => {
  return prev + ' ' + sortedMap.get(cur);
}, '');

console.log(str.trim());
