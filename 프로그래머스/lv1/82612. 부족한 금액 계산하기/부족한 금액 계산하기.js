function solution(price, money, count) {
    let result = new Array(count).fill(price).reduce((acc, cur, idx) => acc + (cur * (idx+1))) - money;
    return result > 0 ? result : 0;
}