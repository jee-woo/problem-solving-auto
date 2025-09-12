function solution(prices) {
    const answer = new Array(prices.length).fill(null);
    const stack = [];
    
    for (let i = 0; i < prices.length; i++) {
        while (stack.length > 0 && prices[i] < prices[stack[stack.length - 1]]) {
            const top = stack.pop();
            answer[top] = i - top;
        }
        stack.push(i);
    }
    
    while (stack.length > 0) {
        const top = stack.pop();
        answer[top] = prices.length - top - 1;
    }
    
    return answer;
}