// 2024.09.28

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, '2606.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');


const COMS = Number(input[0]);
const COUPLES = Number(input[1]);

const matrix = new Array(COMS + 1).fill(null).map(() => new Array(COMS + 1).fill(false));

for (let i = 2; i < input.length; i++) {
  const [n, m] = input[i].split(" ").map(Number);

  matrix[n][m] = true;
  matrix[m][n] = true;
}

const START_NUM = 1;

const visited = new Array(COMS + 1).fill(false);

const dfs = (num) => {
  visited[num] = true;
  for (let i = 1; i < COMS + 1; i++) {
    if (matrix[i][num] && !visited[i]) {
      visited[i] = true;
      dfs(i);
    }
  }
}

dfs(START_NUM);

console.log(visited.filter(Boolean).length - 1)