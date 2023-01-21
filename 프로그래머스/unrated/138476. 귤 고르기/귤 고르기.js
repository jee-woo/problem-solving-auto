function solution(k, tangerine) {
    const sizes = new Map();
    let sizeCount;
    
    for (let i = 0; i < tangerine.length; i++) {
        sizeCount = sizes.get(tangerine[i]);
        if (sizeCount) {
            sizes.set(tangerine[i], sizeCount + 1);
        } else {
            sizes.set(tangerine[i], 1);
        }
    }
    
    const sizeBundle = [...sizes.values()].sort((a, b) => b - a);
    
    let box = 0, kind = 0;
    for (let i = 0; i < sizeBundle.length; i++) {
        if (box + sizeBundle[i] <= k) {
            box += sizeBundle[i];
            kind++;
        } else if (box + sizeBundle[i] > k) {
            box = k;
            kind++;
            break;
        }
        if (box >= k) break;
    }
    
    return kind;
}