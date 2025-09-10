from collections import deque

def solution(n, results):
    answer = 0
    
    ranks = [[False] * (n+1) for _ in range(n+1)]
    
    for a, b in results:
        ranks[a][b] = True
    
    for k in range(1, n+1):
        for i in range(1, n+1):
            for j in range(1, n+1):
                if ranks[i][k] and ranks[k][j]:
                    ranks[i][j] = True
    
    for i in range(1, n+1):
        count = 0
        for j in range(1, n+1):
            if ranks[i][j] or ranks[j][i]:
                count += 1
        if count == n-1:
            answer += 1
    
    return answer


"""

graph

플로이드-워셜


"""