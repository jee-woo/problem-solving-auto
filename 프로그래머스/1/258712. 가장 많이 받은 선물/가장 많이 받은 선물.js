function solution(friends, gifts) {
    let max = 0;
    // 기록 있으면, 이번 달까지 더 많은 선물을 준 사람 <- 적게 준 사람 (다음 달에)
    // 기록 없거나 기록 같으면, 선물지수 큰사람 <- 선물지수 작은사람
    //      선물 지수 = 이번 달까지 자신이 친구들에게 준 선물의 수 - 받은 선물의 수
    // 선물지수까지 같으면 선물 주고받지 X
    
    // 선물을 가장 많이 받을 친구가 받을 선물의 수?
    
    // "A B"일 때, A -> B
    ////////////////////////////////////////////////////////////////////////
    
    // 0. friends 매핑 (name -> 0~49)
    // 1. 50 * 50 친구 배열에 선물 주고받은 기록 저장 + 선물지수 계산
    // 2. 50 * 50 돌면서 선물 몇개 받는지 계산(선물지수 활용) -> max 갱신
    
    const N = friends.length; // 친구 숫자
    // 주고받은 선물 테이블
    const giveTake = Array.from({length: N}, () => Array.from({length: N}, () => 0));
    // 선물지수
    const jisu = new Array(N).fill(0);
    const friendMap = new Map();
    const takes = new Array(N).fill(0);
    
    // 0
    for (let i = 0; i < N; i++) {
        friendMap.set(friends[i], i);
    }
    
    // 1
    let fi, ti;
    let from, to;
    for (let i = 0; i < gifts.length; i++) {
        [from, to] = gifts[i].split(' ');
        fi = friendMap.get(from);
        ti = friendMap.get(to);
        jisu[fi] += 1;
        jisu[ti] -= 1;
        giveTake[fi][ti] += 1;
    }
    // console.table(jisu);
    
    // 2. 50 * 50 돌면서 선물 몇개 받는지 계산(선물지수 활용) -> max 갱신
    for (let i = 0; i < N; i++) {
        for (let j = i; j < N; j++) {
            if (i === j) continue;
            // i: 준, j: 받은
            // 기록 없으면
            if (giveTake[i][j] === 0 && giveTake[j][i] === 0) {
                if (jisu[i] > jisu[j]) {
                    takes[i]++;
                } else if (jisu[i] < jisu[j]) {
                    takes[j]++;
                }
            } else {
                if (giveTake[i][j] > giveTake[j][i]) {
                    takes[i]++;
                } else if (giveTake[i][j] < giveTake[j][i]) {
                    takes[j]++;
                } else {
                    if (jisu[i] > jisu[j]) {
                        takes[i]++;
                    } else if (jisu[i] < jisu[j]) {
                        takes[j]++;
                    }
                }
            }
            max = Math.max(max, takes[i], takes[j]);
        }
    }
    
    return max;
}