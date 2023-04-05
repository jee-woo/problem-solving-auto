const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/1012.txt"
  )
  .toString()
  .split("\n");


const T = +input[0];

const makeField = (m, n, positions) => {
  const field = new Array(m);
  for (let i = 0; i < m; i++) field[i] = new Array(n).fill(0);

  positions.forEach((xy) => {
    field[xy[0]][xy[1]] = 1;
  });

  return field;
};

const solution = (m, n, k, posOfCabbages) => {
  let worms = 0;

  const cabbageField = makeField(m, n, posOfCabbages);

  const visited = new Array(m);
  for (let i = 0; i < m; i++) visited[i] = new Array(n).fill(false);

  const dfs = (i, j) => {
    visited[i][j] = true;
    if (cabbageField[i - 1]?.[j] === 1 && !visited[i - 1]?.[j]) {
      dfs(i - 1, j);
    }
    if (cabbageField[i + 1]?.[j] === 1 && !visited[i + 1]?.[j]) {
      dfs(i + 1, j);
    }
    if (cabbageField[i]?.[j - 1] === 1 && !visited[i]?.[j - 1]) {
      dfs(i, j - 1);
    }
    if (cabbageField[i]?.[j + 1] === 1 && !visited[i]?.[j + 1]) {
      dfs(i, j + 1);
    }
    return;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (cabbageField[i][j] === 1 && !visited[i][j]) {
        dfs(i, j);
        worms++;
      }
    }
  }

  return worms;
};

let MNKIdx = 1;
for (let i = 0; i < T; i++) {
  let [M, N, K] = input[MNKIdx].split(" ").map(Number);
  let posOfCabbages = input
    .slice(MNKIdx + 1, MNKIdx + K + 1)
    .map((xy) => xy.split(" ").map(Number));
  MNKIdx += K + 1;

  console.log(solution(M, N, K, posOfCabbages));
}
