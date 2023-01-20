function solution(priorities, location) {
    const waitingList = priorities.slice();
    const printed = new Array(priorities.length).fill(false);
    
    let max, pointer = 0, order = 1;
    let maxPrinted = true;
    
    while (true) {
        if (pointer === waitingList.length) pointer = 0;
        if (printed[pointer]) {
            pointer++;
            continue;
        }
        if (maxPrinted) {
            max = waitingList.reduce((acc, cur, idx) => {
                if (acc <= cur && !printed[idx]) return cur;
                return acc;
            }, 0);
            maxPrinted = false;
        }
        
        if (waitingList[pointer] >= max) {
            if (pointer === location) return order;
            printed[pointer] = true;
            order++;
            maxPrinted = true;
        }
        
        pointer++;
    }
}