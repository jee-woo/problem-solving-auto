// 2024.10.02

const fs = require("fs");
// const path = require("path");
// const filePath = path.join(__dirname, "10026.txt");
// const input = fs.readFileSync(filePath, "utf-8").trim().split("\n");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const painting = input.slice(1).map((v) => v.trim().split(""));
const rgPainting = input.slice(1).map((v) =>
  v
    .trim()
    .split("")
    .map((v) => (v === "G" ? "R" : v))
);

const visited = new Array(N).fill(null).map(() => new Array(N).fill(false));
const rgVisited = new Array(N).fill(null).map(() => new Array(N).fill(false));

let section = 0;
let rgSection = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      dfs([i, j], painting[i][j], visited, painting);
      section++;
    }
    if (!rgVisited[i][j]) {
      dfs([i, j], rgPainting[i][j], rgVisited, rgPainting);
      rgSection++;
    }
  }
}

console.log(section, rgSection);

function dfs([row, col], color, nowVisited, nowPainting) {
  nowVisited[row][col] = true;
  const dxdy = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  for (let i = 0; i < dxdy.length; i++) {
    if (
      row + dxdy[i][0] >= 0 &&
      row + dxdy[i][0] < N &&
      col + dxdy[i][1] >= 0 &&
      col + dxdy[i][1] < N
    ) {
      const [nowRow, nowCol] = [row + dxdy[i][0], col + dxdy[i][1]];
      const nowColor = nowPainting[nowRow][nowCol];
      if (!nowVisited[nowRow][nowCol] && nowColor === color) {
        dfs([nowRow, nowCol], nowColor, nowVisited, nowPainting);
      }
    }
  }
}
