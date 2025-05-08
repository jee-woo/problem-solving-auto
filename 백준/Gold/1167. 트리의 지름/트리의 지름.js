// 2025.05.08

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);

const graph = {};

for (let i = 1; i < input.length; i++) {
  const [v, ...connected] = input[i].split(' ').map(Number).slice(0, -1);
  for (let j = 0; j < connected.length; j += 2) {
    if (!graph[v]) {
      graph[v] = [];
    }
    graph[v].push([connected[j], connected[j + 1]]); // 정점, 거리
  }
}
// console.table(graph);

let maxLen = 0;
let maxNode = -1;

let visited = new Array(n + 1).fill(false);
const dfs = (node, len) => {
  if (len >= maxLen) {
    maxLen = len;
    maxNode = node;
  }
  visited[node] = true;

  // console.log(node, graph[node]);
  if (!graph[node]) return;
  for (let [i, dist] of graph[node]) {
    if (visited[i]) continue;
    dfs(i, len + dist);
  }
};

dfs(1, 0);
visited = new Array(n + 1).fill(false);
dfs(maxNode, 0);

console.log(maxLen);

/*

1-3
  |
2-4-5

*/
