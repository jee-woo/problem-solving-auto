from collections import deque
def get_next(x, y, dx, dy, board):
    # 장애물, 벽 있으면 멈춰서 그 자리 리턴
    n = len(board)
    m = len(board[0])
    nx = x
    ny = y
    if dy == 0: # 세로로 이동
        for i in range(n):
            nx = x + dx * i
            nnx = x + dx * (i+1)
            
            if nnx < 0 or nnx >= n:
                break
            if board[nnx][y] == 'D':
                break
    if dx == 0: # 가로로 이동
        for i in range(m):
            ny = y + dy * i
            nny = y + dy * (i+1)
            
            if nny < 0 or nny >= m:
                break
            if board[x][nny] == 'D':
                break
    if x == nx and y == ny: return None
    return nx, ny
    
def solution(board):
    answer = -1
    n = len(board)
    m = len(board[0])
    
    q = deque()
    rx, ry = 0, 0
    gx, gy = 0, 0
    
    for i in range(n):
        for j in range(m):
            if board[i][j] == 'R': rx, ry = i, j
            if board[i][j] == 'G': gx, gy = i, j
    
    q.append((rx, ry, 0)) # 시작x, 시작y, 이동횟수
    
    dx = [-1, 0, 0, 1]
    dy = [0, -1, 1, 0]
    visited = [[False for _ in range(m)] for _ in range(n)]
    while q:
        x, y, count = q.popleft()
        if x == gx and y == gy:
            answer = count
            break
        for i in range(4):
            next_pos = get_next(x, y, dx[i], dy[i], board)
            # print(next_pos)
            
            if next_pos:
                nx, ny = next_pos
                if visited[nx][ny]: continue
                visited[nx][ny] = True
                q.append((next_pos[0], next_pos[1], count + 1))
    
    return answer

"""
bfs?

"""