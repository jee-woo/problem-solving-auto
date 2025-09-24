from collections import deque

def solution(x, y, n):
    answer = 1_000_001
    q = deque()
    q.append((x, 0))
    visited = dict()
    
    while q:
        now, count = q.popleft()
        if now > y: continue
        if now == y:
            return count
        
        if now + n <= y and now + n not in visited:
            q.append((now + n, count + 1))
            visited[now+n] = True
        if now * 2 <= y and now * 2 not in visited:
            q.append((now * 2, count + 1))
            visited[now*2] = True
        if now * 3 <= y and now * 3 not in visited:
            q.append((now * 3, count + 1))
            visited[now*3] = True
            
        
    return -1

"""
x를 y로 변환하기 위해 필요한 최소 연산 횟수 return


dp?? bfs??

y부터 시작해서
y / 2
y / 3
y - n

top down으로 저장

5 / 2 = 2.5  X
5 / 3 = 1.xx X
5 - 4 = 1
    1 / 2, 1 / 3 (다시 더할 수는 없음)


"""