function solution(stones, k) {
    // stones 배열의 크기는 1 이상 200,000 이하
    // k는 1 이상 stones의 길이 이하인 자연수
    // 징검다리를 건너야 하는 니니즈 친구들의 수는 무제한 (200,000,000)
    // 한 번에 건너뛸 수 있는 디딤돌의 최대 칸수 k
    
    // 다음으로 밟을 수 있는 디딤돌이 여러 개인 경우 무조건 가장 가까운 디딤돌로만 건너뛸 수 있습니다.
    // 한 친구가 징검다리를 모두 건넌 후에 그 다음 친구가 건너기 시작합니다.
    // 최대 몇 명까지 징검다리를 건널 수 있는지?
    
    // 0이 k개 연속일 때까지만 건널 수 있음
    
    // 이분탐색 nlog(2억) -> 가능~
    // log(2억) = 27
    const n = stones.length;
    if (n === 1) return stones[0];
    const isPossible = (mid) => {
        // 최대 빈 칸 k가 넘는지 계산
        let cnt = 0;
        for (let i = 0; i < n; i++) {
            if (stones[i] - mid <= 0) cnt++;
            else cnt = 0;
            
            if (cnt >= k) return false;
        }
        return true;
    }
    
    let l = 0, r = 200_000_000;
    let mid = Math.floor((l + r) / 2);
    while (l < r) {        
        if (isPossible(mid)) {
            l = mid + 1;
        } else {
            r = mid;
        }
        mid = Math.floor((l + r) / 2);
    }
    
    return mid;
}