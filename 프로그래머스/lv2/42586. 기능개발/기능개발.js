function solution(progresses, speeds) {
    // 7 3 9
    // 5 10 1 1 20 1
    let remainProgress, nowDaysNeed = 0, prevDaysNeed = 0;
    let funcToDistribute = 0;
    const result = [];
    
    for (let i = 0; i < progresses.length; i++) {
        remainProgress = 100 - progresses[i];
        nowDaysNeed = Math.ceil(remainProgress / speeds[i]);
        if (nowDaysNeed === prevDaysNeed) {
            funcToDistribute++;
            continue;
        }
        prevDaysNeed = Math.max(nowDaysNeed, prevDaysNeed);
        
        if (nowDaysNeed !== prevDaysNeed) {
            funcToDistribute++;
        } else {
            result.push(funcToDistribute);
            funcToDistribute = 1;
        }
    }
    
    result.push(funcToDistribute);
    
    if (result[0] === 0) return result.slice(1);
    if (result.at(-1) === 0) return result.slice(0, -1);
    return result;
}