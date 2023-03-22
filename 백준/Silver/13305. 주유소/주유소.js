const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, roads, cities] = [
  input[0],
  input[1].split(" ").map(Number),
  input[2].split(" ").map(Number),
];

const solution = (cities, roads) => {
  let sum = 0;
  const minPrice = Math.min(...roads.slice(0, roads.length - 1));
  let nowToGo = roads.reduce((prev, cur) => prev + cur);

  for (let i = 0; i < cities.length; i++) {
    if (cities[i] === minPrice) {
      sum += minPrice * nowToGo;
      break;
    } else if (i < cities.length - 1) {
      sum += cities[i] * roads[i];
    }

    nowToGo -= roads[i];
  }

  return sum;
};

console.log(solution(cities, roads));
