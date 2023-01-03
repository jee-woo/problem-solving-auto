function solution(X, Y) {
    // map
    const yMap = new Map();
    
    for (let y of Y) {
        let count = yMap.get(y);
        if (count !== undefined) {
            yMap.set(y, count + 1);
        } else {
            yMap.set(y, 1);
        }
    }
    
    const xyArr = [];
    
    for (let [x] of X) {
        let count = yMap.get(x);
        if (count && count > 0) {
            xyArr.push(x);
            yMap.set(x, count - 1);
        }
    }
    
    if (xyArr.length === 0) return "-1";
    else {
        xyArr.sort((a, b) => b - a);
    }
    
    const xySet = new Set(xyArr);
    if (xySet.size === 1 && xySet.has('0')) {
        return '0';
    }
    
    return xyArr.join("");
}