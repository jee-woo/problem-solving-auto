from collections import deque

def solution(storage, requests):
    answer = 0
    # 배열화
    for i in range(len(storage)):
        storage_row = list(storage[i])
        storage[i] = storage_row
        
    n = len(storage)+2
    m = len(storage[0])+2
    
    pad_storage = [[0] * m for _ in range(n)]
    for i in range(1, n-1):
        for j in range(1, m-1):
            pad_storage[i][j] = storage[i-1][j-1]
    storage = pad_storage
    
    dr = [0, -1, 1, 0]
    dc = [1, 0, 0, -1]
    def bfs(r, c, alpha):
        q = deque([(r, c)])
        visited = [[False] * m for _ in range(n)]
        while q:
            now_r, now_c = q.popleft()
            if storage[now_r][now_c] == alpha:
                storage[now_r][now_c] = 0
                continue
                
            if storage[now_r][now_c] != 0 and storage[now_r][now_c] != alpha:
                continue
            
            if storage[now_r][now_c] == 0:
                for i in range(4):
                    nr = now_r + dr[i]
                    nc = now_c + dc[i]
                    if nr < 0 or nc < 0 or nr >= n or nc >= m: continue
                    if visited[nr][nc]: continue
                    visited[nr][nc] = True
                    q.append((nr, nc))
    
    def jige(alpha):
        bfs(0, 0, alpha)
        return
    
    def crane(alpha):
        for i in range(n):
            for j in range(m):
                if storage[i][j] == alpha: storage[i][j] = 0
        return
    
    # for i in range(n):
    #     print(storage[i])
    # print()
    for req in requests:
        # 지게차
        if len(req) == 1:
            jige(req)
        # 크레인
        else:
            crane(req[0])
    
    # for i in range(n):
    #     print(storage[i])
    
    for i in range(n):
        for j in range(m):
            if storage[i][j] != 0: answer += 1
    return answer

"""
모든 요청을 순서대로 완료한 후 남은 컨테이너의 수를 return

“A”처럼 알파벳 하나로만 출고 요청이 들어올 경우
-> 지게차를 사용해 출고 요청이 들어온 순간 접근 가능한 컨테이너를 꺼냅니다.

"BB"처럼 같은 알파벳이 두 번 반복된 경우
-> 크레인을 사용해 요청된 종류의 모든 컨테이너를 꺼냅니다.

"""