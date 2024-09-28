const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, '11399.txt');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const minutes = input[1].split(' ').map(Number);

minutes.sort((a, b) => a - b);

const sums = [minutes[0]];

for (let i = 1; i < N; i++) {
  sums.push(sums[i-1] + minutes[i]);
}

const result = sums.reduce((prev, cur) => prev + cur, 0);
console.log(result)