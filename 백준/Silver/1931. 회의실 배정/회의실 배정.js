let input = require("fs")
.readFileSync("/dev/stdin")
.toString()
.trim()
.split("\n");

let arr = input.slice(1).map(nums => nums.split(" ").map(Number));

function solution(meeting) {
  const sorted = meeting.slice().sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    } else {
      return a[1] - b[1];
    }
  });

  let endTime = -1;
  let count = 0;

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i][0] >= endTime) {
      endTime = sorted[i][1];
      count++;
    }
  }

  return count;
}

console.log(solution(arr));
