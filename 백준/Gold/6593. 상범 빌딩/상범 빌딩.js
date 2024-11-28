// 2024.11.28

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const bfs = (building, start, end, size) => {
  const [L, R, C] = size;
  const [sl, sr, sc] = start;
  const [el, er, ec] = end;
  const checked = Array.from({ length: L }, () =>
    Array.from({ length: R }, () => Array(C).fill(false))
  );

  const queue = [[sl, sr, sc, 0]];

  while (queue.length) {
    const [nl, nr, nc, nm] = queue.shift();

    if (nl === el && nr === er && nc === ec) {
      return nm;
    }

    const dxdy = [
      [nl - 1, nr, nc],
      [nl + 1, nr, nc],
      [nl, nr - 1, nc],
      [nl, nr + 1, nc],
      [nl, nr, nc - 1],
      [nl, nr, nc + 1],
    ];

    for (let [l, r, c] of dxdy) {
      if (l < 0 || r < 0 || c < 0 || l >= L || r >= R || c >= C) continue;
      if (checked[l][r][c]) continue;
      if (building[l][r][c] === '#') continue;

      queue.push([l, r, c, nm + 1]);
      checked[l][r][c] = true;
    }
  }

  return -1;
};

let index = 0;

while (true) {
  // L, R, C 읽기
  const [L, R, C] = input[index++].split(' ').map(Number);

  // 종료 조건
  if (L === 0 && R === 0 && C === 0) break;

  const building = [];
  let start = null;
  let end = null;

  for (let l = 0; l < L; l++) {
    const floor = [];
    for (let r = 0; r < R; r++) {
      const line = input[index++];
      floor.push(line.split(''));

      // 시작 지점과 종료 지점 찾기
      if (line.includes('S')) {
        start = [l, r, line.indexOf('S')];
      }
      if (line.includes('E')) {
        end = [l, r, line.indexOf('E')];
      }
    }
    building.push(floor);
    index++; // 빈 줄 건너뛰기
  }

  const mins = bfs(building, start, end, [L, R, C]);

  if (mins > -1) {
    console.log(`Escaped in ${mins} minute(s).`);
  } else {
    console.log('Trapped!');
  }
}
