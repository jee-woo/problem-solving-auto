// 2025.05.09

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, L] = input[0].split(' ').map(Number);

let map = input.slice(1).map((v) => v.split(' ').map(Number));
let possible = 0;

const count = () => {
  // 행
  for (let i = 0; i < N; i++) {
    let visited = Array(N).fill(false); // 경사로 설치 여부 체크
    let isPossible = true;

    for (let j = 0; j < N - 1; j++) {
      let curr = map[i][j];
      let next = map[i][j + 1];

      // 높이 차이 0
      if (curr === next) continue;

      // 높이 차이 1 이상
      if (Math.abs(curr - next) > 1) {
        isPossible = false;
        break;
      }

      // 올라가는 경우
      if (curr < next) {
        for (let k = j; k > j - L; k--) {
          if (k < 0 || map[i][k] !== curr || visited[k]) {
            isPossible = false;
            break;
          }
          visited[k] = true;
        }
      }

      // 내려가는 경우
      else if (curr > next) {
        for (let k = j + 1; k <= j + L; k++) {
          if (k >= N || map[i][k] !== next || visited[k]) {
            isPossible = false;
            break;
          }
          visited[k] = true;
        }
      }

      if (!isPossible) break;
    }

    if (isPossible) possible++;
  }
};

const rotate90 = () => {
  let temp = map.map((v) => v.slice());
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      map[i][j] = temp[N - j - 1][i];
    }
  }
};
let temp = map.map((v) => v.slice());
count();
map = temp;
rotate90();
count();
console.log(possible);

/*
행 n번 순회
열 n번 순회

지금 위치와 다음 위치의 높이가 같으면 continue
2 이상 차이나면 불가능. break
1 차이나면 다음 위치부터 L만큼 높이가 같은지 확인
가능하면 경사로를 놓고 그 다음부터 다시 앞의 과정 반복


3 2 1 1 2 3

-\  /-
--\/--
------

*/
