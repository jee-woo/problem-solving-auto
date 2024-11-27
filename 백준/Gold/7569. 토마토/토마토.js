// 2024.11.27

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [M, N, H] = input[0].split(' ').map(Number);
const tomatoes = new Array(H)
  .fill(null)
  .map(() => new Array(N).fill(null).map(() => new Array(M)));
for (let h = 0; h < H; h++) {
  let box = input
    .slice(1 + h * N, 1 + h * N + N)
    .map((v) => v.split(' ').map(Number));

  for (let n = 0; n < N; n++) {
    for (let m = 0; m < M; m++) {
      tomatoes[h][n][m] = box[n][m];
    }
  }
}

// 1: 익은 토마토, 0 : 익지 않은 토마토, -1: 토마토 X
// 하나의 토마토에 인접한 곳은 위, 아래, 왼쪽, 오른쪽, 앞, 뒤 여섯 방향

let all = H * M * N;
const queue = [[]];

let day = 0;
let ripenTomatoes = 0;

const bfs = () => {
  let news;
  while (queue.length) {
    news = [];
    const now = queue.shift();

    for (let [nowH, nowN, nowM] of now) {
      ripenTomatoes++;

      tomatoes[nowH][nowN][nowM] = 1;
      const dxdy = [
        [nowH + 1, nowN, nowM],
        [nowH - 1, nowN, nowM],
        [nowH, nowN + 1, nowM],
        [nowH, nowN - 1, nowM],
        [nowH, nowN, nowM + 1],
        [nowH, nowN, nowM - 1],
      ];

      for (let [h, n, m] of dxdy) {
        if (h < 0 || n < 0 || m < 0 || h >= H || n >= N || m >= M) continue;
        if (tomatoes[h][n][m] !== 0) continue;

        news.push([h, n, m]);
        tomatoes[h][n][m] = 1;
      }
    }

    if (news.length > 0) {
      queue.push(news);
      day++;
    }
  }
};

for (let h = 0; h < H; h++) {
  for (let n = 0; n < N; n++) {
    for (let m = 0; m < M; m++) {
      if (tomatoes[h][n][m] === 1) {
        queue[0].push([h, n, m]);
      }
      if (tomatoes[h][n][m] === -1) {
        all--;
      }
    }
  }
}

bfs();

if (ripenTomatoes < all) console.log(-1);
else console.log(day);
