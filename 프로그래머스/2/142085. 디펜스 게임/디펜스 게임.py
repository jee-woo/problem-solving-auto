import heapq

def solution(n, k, enemy):
    answer = 0
    q = []
    for e in enemy:
        heapq.heappush(q, -e)
        n -= e
        if n < 0:
            if k > 0:
                # 무적권이 있다면, 지금까지 병사로 막았던 적 중
                # 가장 큰 적에게 무적권을 소급 적용하고 병사를 회복합니다.
                largest = heapq.heappop(q) # q에서 가장 큰 적을 꺼냄
                n -= largest               # 병사 n을 회복
                k -= 1                     # 무적권 1회 사용
            else:
                # 무적권이 없으면, 현재 라운드에서 막지 못하고 끝납니다.
                break
        answer += 1
    
    return answer

"""
준호가 몇 라운드까지 막을 수 있는지 return

남은 병사의 수보다 현재 라운드의 적의 수가 더 많으면 게임이 종료됩니다.
무적권은 최대 k번 사용할 수 있습니다.

무적권을 언제 사용해야 할지?

- enemy[i]가 남은 병사보다 같거나 크면 사용
- 작으면?

n = 7, k = 3
4 2 4 5 3 3 1
3 1 k k k


n = 7, k = 3
2 2 2 2 2 1 5 5
5 3 1 k k 0 k

그리디?
누적합?
"""