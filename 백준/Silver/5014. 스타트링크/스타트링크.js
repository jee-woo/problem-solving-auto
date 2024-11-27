// 2024.11.27

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [F, S, G, U, D] = input[0].split(' ').map(Number);

// 총 F층, 스타트링크 G층, 지금 S층
// U: 위로 U층 버튼, D: 아래로 D층 버튼

let enable = false;
let answer = 0;

const bfs = () => {
  const visited = new Array(F + 1);
  const queue = [[S, 0]];
  visited[S] = true;

  while (queue.length) {
    const [now, b] = queue.shift();

    if (now === G) {
      enable = true;
      answer = b;
      break;
    }

    const nextFloors = [now + U, now - D];

    for (let s of nextFloors) {
      if (s > F || s <= 0 || visited[s]) continue;
      queue.push([s, b + 1]);
      visited[s] = true;
    }
  }
};

bfs();

if (!enable) console.log('use the stairs');
else console.log(answer);
