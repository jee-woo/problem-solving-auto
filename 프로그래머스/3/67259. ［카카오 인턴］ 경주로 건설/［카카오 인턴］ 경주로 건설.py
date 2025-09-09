from collections import deque

def solution(board):
    n = len(board)
    
    # visited_cost[r][c][dir]
    # (r, c)에 dir 방향으로 도착했을 때의 최소 비용을 저장
    # 0:오른쪽, 1:아래, 2:왼쪽, 3:위
    visited_cost = [[[int(1e9)] * 4 for _ in range(n)] for _ in range(n)]

    q = deque()

    # 방향 벡터: 오른쪽, 아래, 왼쪽, 위
    dr = [0, 1, 0, -1]
    dc = [1, 0, -1, 0]

    # 시작 지점에서 초기 큐에 항목 추가
    # 시작점 (0,0)은 비용이 0이므로, 첫 이동은 비용 100
    if board[0][1] == 0:
        q.append((0, 1, 100, 0)) # r, c, cost, direction
        visited_cost[0][1][0] = 100
    
    if board[1][0] == 0:
        q.append((1, 0, 100, 1))
        visited_cost[1][0][1] = 100

    while q:
        r, c, cost, past_dir = q.popleft()

        # 도착 지점이라면 최소 비용 갱신 (반환은 모든 탐색 후)
        if r == n - 1 and c == n - 1:
            continue

        # 4가지 방향으로 이동
        for i in range(4):
            nr = r + dr[i]
            nc = c + dc[i]

            # 비용 계산
            # 이전 방향과 같으면 100원, 다르면 600원
            plus_cost = 100 if past_dir == i else 600
            new_cost = cost + plus_cost

            # 유효성 검사 (범위, 벽)
            if 0 <= nr < n and 0 <= nc < n and board[nr][nc] == 0:
                # 현재까지의 비용이 이전에 방문했던 비용보다 적은 경우에만 큐에 추가
                if new_cost < visited_cost[nr][nc][i]:
                    visited_cost[nr][nc][i] = new_cost
                    q.append((nr, nc, new_cost, i))

    # 모든 탐색이 끝난 후 도착점의 최소 비용 반환
    return min(visited_cost[n-1][n-1])


"""
직선 도로 100원
코너 500원

최소 비용

BFS로 가능한 모든 경로 구하고 비용 최소인 경로 반환

visited 계산?
왔던 방향을 visited 값으로 저장?




"""