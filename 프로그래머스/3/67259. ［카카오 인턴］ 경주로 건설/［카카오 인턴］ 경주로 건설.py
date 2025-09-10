import heapq

def solution(board):
    n = len(board)
    
    # visited_cost[r][c][dir]에 (r, c)에 dir 방향으로 도착하는 최소 비용을 저장
    visited_cost = [[[float('inf')] * 4 for _ in range(n)] for _ in range(n)]

    # 우선순위 큐: (cost, r, c, direction)
    pq = []
    
    # 방향 벡터: 0: 오른쪽, 1: 아래, 2: 왼쪽, 3: 위
    dr = [0, 1, 0, -1]
    dc = [1, 0, -1, 0]

    # 시작점 (0, 0)에서 첫 이동에 대한 상태를 우선순위 큐에 추가
    # 오른쪽으로 이동
    if board[0][1] == 0:
        heapq.heappush(pq, (100, 0, 1, 0))
        visited_cost[0][1][0] = 100
    
    # 아래로 이동
    if board[1][0] == 0:
        heapq.heappush(pq, (100, 1, 0, 1))
        visited_cost[1][0][1] = 100

    while pq:
        cost, r, c, past_dir = heapq.heappop(pq)
        
        # 현재 꺼낸 비용이 이미 저장된 최소 비용보다 크면 무시
        if cost > visited_cost[r][c][past_dir]:
            continue

        # 도착 지점이라면 최종 비용 업데이트
        if r == n - 1 and c == n - 1:
            continue

        # 네 방향으로 이동
        for i in range(4):
            nr = r + dr[i]
            nc = c + dc[i]

            # 비용 계산: 직선은 100원, 코너는 600원
            plus_cost = 100 if past_dir == i else 600
            new_cost = cost + plus_cost
            
            # 유효성 검사 (범위, 벽)
            if 0 <= nr < n and 0 <= nc < n and board[nr][nc] == 0:
                # 더 저렴한 경로를 찾았다면 갱신하고 우선순위 큐에 추가
                if new_cost < visited_cost[nr][nc][i]:
                    visited_cost[nr][nc][i] = new_cost
                    heapq.heappush(pq, (new_cost, nr, nc, i))
    
    # 도착점의 네 방향 비용 중 최소값을 반환
    return min(visited_cost[n-1][n-1])