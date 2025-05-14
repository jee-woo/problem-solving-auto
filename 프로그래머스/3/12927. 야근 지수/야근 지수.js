function solution(n, works) {
    // 모든 일을 다 처리할 수 있는 경우
    const sum = works.reduce((a, b) => a + b, 0);
    if (sum <= n) return 0;
    
    // 최대 힙(Max Heap) 구현을 위한 정렬
    works.sort((a, b) => b - a);
    
    // n시간 동안 가장 큰 작업량을 1씩 감소
    for (let i = 0; i < n; i++) {
        works[0]--;  // 가장 큰 작업량 감소
        
        // 정렬 상태 유지 (삽입 정렬 방식)
        let j = 0;
        while (j + 1 < works.length && works[j] < works[j + 1]) {
            [works[j], works[j + 1]] = [works[j + 1], works[j]];
            j++;
        }
    }
    
    // 야근 피로도 계산
    return works.reduce((acc, cur) => acc + BigInt(cur * cur), BigInt(0));
}
/*
야근 피로도 = 야근을 시작한 시점 + (남은 일의 작업량)^2

1시간동안 작업량 1 처리 가능


=> n시간 동안 야근 피로도 최소화


[12, 2, 1] -> 합 15

12^2 = 144
2^2 = 4
1^2 = 1
149

[6, 8, 1]
6^2 = 36
8^2 = 64
1^2 = 1
101

[5, 5, 5]
5^2 = 25
5^2 = 25
5^2 = 25
75

결국에는 works의 전체 합에서, 어떻게 works의 길이만큼의 숫자들로 나눴을 때 제곱 합이 제일 작은가?


*/