// 2024.11.29

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);

const bfs = () => {
  const queue = [[N, `${N}`]];
  const visited = new Array(100_001).fill(false);
  visited[N] = true;

  while (queue.length) {
    const [now, way] = queue.shift();
    if (now === K) {
      console.log(way.split(' ').length - 1);
      console.log(way);
      return;
    }

    const next = [now - 1, now + 1, now * 2];

    for (let n of next) {
      if (n < 0 || n > 100_000 || visited[n]) continue;
      queue.push([n, `${way} ${n}`]);
      visited[n] = true;
    }
  }
};

bfs();
