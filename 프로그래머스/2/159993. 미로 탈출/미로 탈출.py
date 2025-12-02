from collections import deque

def solution(maps):
    answer = 0
    
    maps = [list(s) for s in maps]
    
    # 시작 찾기
    sr = 0
    sc = 0
    n = len(maps)
    m = len(maps[0])
    for r in range(n):
        found = False
        for c in range(m):
            if maps[r][c] == 'S':
                sr = r
                sc = c
                found = True
                break
            if found: break
            
    # 1. 레버 칸으로 이동    
    q = deque()
    q.append((sr, sc, 0))
    
    dr = [0, -1, 1, 0]
    dc = [1, 0, 0, -1]
    visited = [[False] * m for _ in range(n)]
    
    lr = 0
    lc = 0
    found = False
    visited[sr][sc] = True
    while q:
        r, c, cnt = q.popleft()
        if maps[r][c] == 'L':
            answer += cnt
            lr = r
            lc = c
            found = True
            break
        for i in range(4):
            nr = r + dr[i]
            nc = c + dc[i]
            if nr < 0 or nc < 0 or nr >= n or nc >= m: continue
            if maps[nr][nc] == 'X': continue
            if visited[nr][nc]: continue
            visited[nr][nc] = True
            q.append((nr, nc, cnt+1))
    
    if not found: return -1

    # 2. 출구로 이동
    visited = [[False] * m for _ in range(n)]
    q = deque()
    q.append((lr, lc, 0))
    visited[lr][lc] = True
    
    while q:
        r, c, cnt = q.popleft()
        if maps[r][c] == 'E':
            answer += cnt
            return answer
        for i in range(4):
            nr = r + dr[i]
            nc = c + dc[i]
            if nr < 0 or nc < 0 or nr >= n or nc >= m: continue
            if maps[nr][nc] == 'X': continue
            if visited[nr][nc]: continue
            visited[nr][nc] = True
            q.append((nr, nc, cnt+1))
        
    return -1

"""
최대한 빠르게 미로를 빠져나가는데 걸리는 시간 return
만약, 탈출할 수 없다면 -1을 return 

미로에서 한 칸을 이동하는데 1초 소요
출발 지점에서 먼저 레버가 있는 칸으로 이동하여 레버를 당긴 후 미로를 빠져나가는 문이 있는 칸으로 이동하면 됩니다.
이때 아직 레버를 당기지 않았더라도 출구가 있는 칸을 지나갈 수 있습니다.

1. 레버 칸으로 이동 
2. 출구로 이동

BFS
"""