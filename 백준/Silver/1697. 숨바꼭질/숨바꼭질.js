// 2024.09.28

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, '1697.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);

const visited = new Array(100001).fill(false);
const queue = [[N, 0]]; // [위치, 깊이]
visited[N] = true;

const getResult = () => {
    if (N === K) return 0;

    while (queue.length > 0) {
        const [v, depth] = queue.shift();

        // K에 도달했을 때 깊이를 반환
        if (v === K) {
            return depth;
        }

        // 다음 위치를 큐에 추가
        if (v - 1 >= 0 && !visited[v - 1]) {
            visited[v - 1] = true;
            queue.push([v - 1, depth + 1]);
        }
        if (v + 1 <= 100000 && !visited[v + 1]) {
            visited[v + 1] = true;
            queue.push([v + 1, depth + 1]);
        }
        if (v * 2 <= 100000 && !visited[v * 2]) {
            visited[v * 2] = true;
            queue.push([v * 2, depth + 1]);
        }
    }
};

const result = getResult();
console.log(result);
