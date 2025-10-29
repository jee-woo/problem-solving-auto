import heapq

def solution(targets):
    answer = 0
    q = []
    targets.append([int(1e9), int(1e9)])
    targets.sort()
    
    for s, e in targets:
        heapq.heappush(q, (e, s))
        # print(q, answer)
        
        last_e, _ = q[0]
        if last_e <= s:
            while q and q[0][1] < s:
                popped = heapq.heappop(q)
                # print('popped', popped)
                
            answer += 1
    
    # print('final q', q)
    return answer

"""
모든 폭격 미사일을 요격하기 위해 필요한 요격 미사일 수의 최솟값을 return

겹치는 구간이 많은 곳부터 발사


"""