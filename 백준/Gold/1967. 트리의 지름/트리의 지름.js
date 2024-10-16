// 2024.10.16

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = Number(input[0]);

const tree = input.slice(1).map((v) => v.split(' ').map(Number));

// const adj = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(-1));
const adj = {};
let lastParent = 1;

for (let i = 0; i < tree.length; i++) {
  if (!adj[tree[i][0]]) adj[tree[i][0]] = [];
  adj[tree[i][0]].push([tree[i][1], tree[i][2]]);
  if (!adj[tree[i][1]]) adj[tree[i][1]] = [];
  adj[tree[i][1]].push([tree[i][0], tree[i][2]]);
  lastParent = tree[i][0];
}
// console.table(adj);

let maxLen = 0;
let maxNode;

let visited = new Array(n + 1);

function dfs(v, len) {
  visited[v] = true;
  if (len > maxLen) {
    maxNode = v;
    maxLen = len;
  }
  if (!adj[v]) return;
  adj[v].forEach(([toV, toW]) => {
    if (!visited[toV]) dfs(toV, len + toW);
  });
}

dfs(1, 0);
// console.log('maxNode', maxNode);
maxLen = 0;
visited = new Array(n + 1);

dfs(maxNode, 0);
console.log(maxLen);