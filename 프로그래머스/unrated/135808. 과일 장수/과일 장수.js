function solution(k, m, score) {
  const sizeOfBox = parseInt(score.length / m);
  const sortedScore = score.slice().sort((a, b) => b - a);
  let price = 0;

  for (let i = m - 1; i < sizeOfBox * m; i += m) {
    price += sortedScore[i] * m;
  }

  return price;
}