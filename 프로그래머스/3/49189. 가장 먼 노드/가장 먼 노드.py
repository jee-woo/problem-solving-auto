from collections import deque

def solution(n, edge):
    answer = 0
    
    nodes = {}
    
    for a, b in edge:
        if a in nodes:
            nodes[a].append(b)
        else:
            nodes[a] = [b]
        if b in nodes:
            nodes[b].append(a)
        else:
            nodes[b] = [a]
            
    visited = [0] * (n+1)
    visited[1] = 1
    
    q = deque([(1, 0)])
    
    while q:
        now, lines = q.popleft()
        
        for node in nodes[now]:
            if visited[node]: continue
            visited[node] = lines + 1
            q.append((node, lines + 1))
    
    max_lines = max(visited)

    for i in range(1, n+1):
        if visited[i] == max_lines:
            answer += 1

    return answer

"""
최단경로로 이동했을 때 간선의 개수가 가장 많은 노드들

bfs

"""