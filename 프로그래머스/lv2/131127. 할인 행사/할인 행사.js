// discount 배열 뒤에서부터 제품 별 할인 개수를 적어두기 (10일만)

function solution(want, number, discount) {
  let answer = 0;
  const items = new Map();
  let count;

  discount.reverse().map((item, idx) => {
    count = items.get(item);
    if (count) {
      items.set(item, count + 1);
    } else {
      items.set(item, 1);
    }

    if (idx >= 10) {
      removeItem = items.get(discount[idx - 10]);
      items.set(discount[idx - 10], removeItem - 1); // ?
    }

    let canJoin = true;
    for (let i = 0; i < want.length; i++) {
      if (!items.get(want[i]) || items.get(want[i]) < number[i]) {
        canJoin = false;
        break;
      }
    }
    if (canJoin) answer++;
  });
    
  return answer;
}