// 2024.10.15

const fs = require('fs');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);

const bfs = (n, k) => {
  const queue = [[n, 0]];
  const visited = new Array(100_001).fill(false);
  let answer;
  while (queue.length > 0) {
    const [now, seconds] = queue.shift();
    if (now === k) {
      answer = seconds;
      break;
    }

    const dx = [now * 2, now - 1, now + 1];
    dx.forEach((d, i) => {
      if (d >= 0 && d <= 100_000 && !visited[d]) {
        queue.push([d, i == 0 ? seconds : seconds + 1]);
        visited[d] = true;
      }
    });
  }

  return answer;
};

console.log(bfs(N, K));