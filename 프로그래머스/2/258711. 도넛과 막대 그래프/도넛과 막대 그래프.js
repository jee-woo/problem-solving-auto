function solution(edges) {
    const outGraph = new Map();
    const inGraph = new Map();
    let outN, inN;
    let maxNum = 0;
    for (let [n1, n2] of edges) {
        outN = outGraph.get(n1);
        inN = inGraph.get(n2);
        if (outN) {
            outN.push(n2);
        } else {
            outGraph.set(n1, [n2]);
        }

        if (inN) {
            inN.push(n1);
        } else {
            inGraph.set(n2, [n1]);
        }
        maxNum = Math.max(maxNum, n1, n2);
    }
    
    let answer = [0, 0, 0, 0];
    for (let i = 1; i <= maxNum; i++) {
        if (!inGraph.get(i) && outGraph.get(i)?.length >= 2) {
            answer[0] = i;
            continue;
        }
        if (!outGraph.get(i) && inGraph.get(i)) {
            answer[2]++; // 막대
        }
        else if (inGraph.get(i)?.length >= 2 && outGraph.get(i)?.length === 2) answer[3]++; // 8자
    }
    
    // console.log(answer)
    answer[1] = outGraph.get(answer[0]).length - answer[2] - answer[3]; // 도넛
    
    return answer;
}