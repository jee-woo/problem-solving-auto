from collections import deque

def solution(maps):
    answer = []
    n = len(maps)
    m = len(maps[0])
    
    dr = [0, -1, 1, 0]
    dc = [-1, 0, 0, 1]
    
    q = deque()
    visited = [[False] * m for _ in range(n)]
    
    def bfs(q):
        res = 0
        while q:
            r, c, food = q.popleft()
            res += food
            
            for i in range(4):
                nr = r + dr[i]
                nc = c + dc[i]
                if nr < 0 or nc < 0 or nr >= n or nc >= m: continue
                if visited[nr][nc] or maps[nr][nc] == 'X': continue
                visited[nr][nc] = True
                q.append((nr, nc, int(maps[nr][nc])))
            
        return res
    
    for i in range(n):
        for j in range(m):
            if maps[i][j] == 'X' or visited[i][j]:
                continue
            q.append((i, j, int(maps[i][j])))
            visited[i][j] = True
            res = bfs(q)
            answer.append(res)
    
    if not answer: return [-1]
    answer.sort()
    return answer

"""
각 섬에서 최대 며칠씩 머무를 수 있는지 배열에 오름차순으로 담아 return

상, 하, 좌, 우로 연결되는 칸에 적힌 숫자를 모두 합한 값은 해당 무인도에서 최대 며칠동안 머물 수 있는지를 나타냅니다.



"""