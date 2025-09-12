import heapq

def solution(scoville, K):
    answer = 0
    
    q = []
    
    for s in scoville:
        heapq.heappush(q, s)
        
    while len(q) >= 2 and q[0] < K:
        first = heapq.heappop(q)
        second = heapq.heappop(q)
        
        mixed = first + (second * 2)
        answer += 1
        
        heapq.heappush(q, mixed)
        
    if q[0] < K: return -1    
    
    return answer


"""
섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)


"""