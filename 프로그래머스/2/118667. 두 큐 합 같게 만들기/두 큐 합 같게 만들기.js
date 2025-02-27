function solution(queue1, queue2) {
    // 두 큐의 총합이 같게.
    // sum1 + sum2 / 2 (나누어 떨어지지 않으면 -1 리턴)
    // 
    // 두 큐를 붙여서 원형 큐로?
    // 부분 합이 avg이면 
    
    // queue1 -> queue2
    // queue2 -> queue1
    let sum1 = BigInt(0);
    let sum2 = BigInt(0);
    const size = queue1.length;
    
    for (let i = 0; i < size; i++) {
        sum1 += BigInt(queue1[i]);
        sum2 += BigInt(queue2[i]);
    }
    if (sum1 === sum2) return 0;
    let avg = (sum1 + sum2) / BigInt(2);
    // if (avg % BigInt(1) > BigInt(0)) return -1;
    
    let lm = 0, rm = 0;
    let l = 0, r = size - 1;
    const queue = [...queue1, ...queue2];
    
    let sum = sum1;
    while (l <= r) {
        if (sum === avg) return lm + rm;
        if (lm + rm >= size * 3) break;
        if (sum < avg) {
            r++;
            rm++;
            sum += BigInt(queue[r % (size * 2)]);
        } else {
            sum -= BigInt(queue[l % (size * 2)]);
            l++;
            lm++;
        }
        // console.log(l, r, sum)
    }
    
    return -1;
}














