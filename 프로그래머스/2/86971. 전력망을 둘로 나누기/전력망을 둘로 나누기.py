from collections import deque

def solution(n, wires):
    answer = int(1e9)
    
    graph = [set() for _ in range(n+1)]
    
    for v1, v2 in wires:
        graph[v1].add(v2)
        graph[v2].add(v1)
        
    # 각각의 wire를 끊는 경우에 대해
    for v1, v2 in wires:
        graph[v1].remove(v2)
        graph[v2].remove(v1)
        
        visited = [False] * (n+1)
        q = deque()
        
        count = []
        for node in range(1, n+1):
            if visited[node]: continue
            
            q.append(node)
            visited[node] = True
            
            count.append(0)
            # bfs
            while q:
                now = q.popleft()
                count[-1] += 1
                
                for next_node in graph[now]:
                    if visited[next_node]: continue
                    visited[next_node] = True
                    q.append(next_node)
            # count.append(cnt)
        
        answer = min(answer, abs(count[0] - count[1]))
        graph[v1].add(v2)
        graph[v2].add(v1)
        
    
    return answer


"""
전선들 중 하나를 끊어서 송전탑 개수가 가능한 비슷하도록 두 전력망으로 나누었을 때,
두 전력망이 가지고 있는 송전탑 개수의 차이(절대값)를 return

2 <= n <= 100



"""