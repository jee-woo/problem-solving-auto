const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [[N, M], edges] = [
  input[0].split(" ").map(Number),
  input.slice(1).map((el) => el.split(" ").map(Number)),
];

const solution = (n, edges) => {
  const visited = new Array(n + 1).fill(false); // node 개수만큼
  visited[0] = true;

  const adjacent = new Array(n + 1);

  for (let i = 0; i < adjacent.length; i++) {
    adjacent[i] = new Array(n + 1).fill(0);
  }

  edges.forEach((edge) => {
    adjacent[edge[0]][edge[1]] = 1;
    adjacent[edge[1]][edge[0]] = 1;
  });

  const dfs = (node) => {
    visited[node] = true;
    for (let i = 1; i < adjacent[node].length; i++) {
      if (adjacent[node][i] === 1 && !visited[i]) {
        visited[i] = true;
        dfs(i);
      }
    }
    return;
  };

  let count = 0;

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      dfs(i);
      count++;
    }
  }

  return count;
};

console.log(solution(N, edges));
