function solution(t, p) {
    let count = 0;
    let pLength = p.length;
    let tNum, pNum = Number(p);
    
    for (let i = 0; i < t.length - pLength + 1; i++) {
        tNum = Number(t.substring(i, i + pLength));
        if (tNum <= pNum) {
            count++;
        }
    }
    
    return count;
}