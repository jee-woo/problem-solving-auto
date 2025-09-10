from collections import deque

def solution(n, results):
    answer = 0
    
    wins = [[] for _ in range(n+1)]
    loses = [[] for _ in range(n+1)]
    
    for a, b in results:
        wins[a].append(b)
        loses[b].append(a)
    
    for i in range(1, n+1):
        win_count = 0
        q = deque()
        q.append(i)
        
        visited = [False] * (n+1)
        while q:
            now = q.popleft()
            
            for j in wins[now]:
                if visited[j]: continue
                visited[j] = True
                q.append(j)
                win_count += 1
                
        lose_count = 0
        q = deque()
        q.append(i)
        visited = [False] * (n+1)
        while q:
            now = q.popleft()
            for j in loses[now]:
                if visited[j]: continue
                visited[j] = True
                q.append(j)
                lose_count += 1
  
        if win_count + lose_count == n-1:
            answer += 1
    
    
    return answer


"""

graph

방향성 그래프
4->3
4->2
...

4->3
\  |
 \ V
  >2<-1
   |
   V
   5


"""