import heapq

def solution(N, road, K):
    answer = 0

    visited = [False] * (N+1)
    graph = [[] for _ in range(N+1)]
    
    for a, b, t in road:
        graph[a].append((t, b))
        graph[b].append((t, a))
    
    # 1번 마을에서부터의 거리 구하기
    visited[1] = True
    dist = [1e9] * (N+1)
    dist[1] = 0
    
    q = [(0, 1)]
    while q:
        d, now = heapq.heappop(q)
        visited[now] = True
        
        for nd, node in graph[now]:
            if visited[node]: continue
            if dist[node] > d + nd:
                dist[node] = d + nd
                # visited[node] = True
                heapq.heappush(q, (dist[node], node))
        
    # print(dist)
    for i in range(1, N+1):
        if dist[i] <= K:
            # print(i)
            answer += 1
    return answer

"""
1번 마을에 있는 음식점이 K 이하의 시간에 배달이 가능한 마을의 개수를 return 

다익스트라

"""