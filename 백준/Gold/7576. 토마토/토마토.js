// 2024.09.30

const fs = require("fs");
// const path = require("path");
// const filePath = path.join(__dirname, "7576.txt");
// const input = fs.readFileSync(filePath, "utf-8").trim().split("\n");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [M, N] = input[0].split(" ").map(Number);

const storage = input.slice(1).map((v) => v.split(" ").map(Number));

const queue = [[]];

storage.map((line, i) =>
  line.map((v, j) => {
    if (v === 1) queue[0].push([i, j]);
  })
);

let day = 0;

const bfs = () => {
  let now;
  let news;

  while (queue.length > 0) {
    now = queue.shift();
    news = [];

    for (let i = 0; i < now.length; i++) {
      const row = now[i][0];
      const col = now[i][1];

      const ways = [
        [row - 1, col],
        [row, col - 1],
        [row + 1, col],
        [row, col + 1],
      ];

      ways.forEach((way) => {
        if (way[0] < 0 || way[1] < 0) {
        } else if (storage[way[0]]?.[way[1]] === 0) {
          news.push([way[0], way[1]]);
          storage[way[0]][way[1]] = 1;
        }
      });
    }

    if (news.length > 0) {
      queue.push(news);
      day++;
    } else break;
  }
};

bfs();

let enable = true;

storage.forEach((line) =>
  line.forEach((v) => {
    if (v === 0) {
      enable = false;
      return;
    }
  })
);

if (enable) console.log(day);
else console.log(-1);
