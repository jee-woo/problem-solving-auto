from collections import deque

def get_next_rc(start, end):
    sr, sc = start
    er, ec = end
    
    if sr < er:
        r = sr + 1
        return r, sc
    if sr > er:
        r = sr - 1
        return r, sc
    if sc < ec:
        c = sc + 1
        return sr, c
    if sc > ec:
        c = sc - 1
        return sr, c
    return sr, sc  # 이미 같은 위치인 경우 추가

def solution(points, routes):
    answer = 0
    q = deque()
    n = len(points)
    x = len(routes)
    
    for i in range(x):
        route = routes[i]
        if len(route) > 0:  # 빈 경로 체크
            q.append((points[route[0]-1], i, 0))

    while q:
        now = []
        size = min(len(q), x)  # 현재 큐의 크기와 x 중 작은 값 사용
        
        for i in range(size):
            if q:  # 큐가 비어있지 않은지 확인
                now.append(q.popleft())
        
        # 충돌하는가?
        position_count = {}
        for pos, _, _ in now:
            pos_tuple = tuple(pos)
            position_count[pos_tuple] = position_count.get(pos_tuple, 0) + 1
        
        # 충돌 지점 카운트
        collision_points = set()
        for pos, count in position_count.items():
            if count > 1:
                collision_points.add(pos)
        
        answer += len(collision_points)
        # crushed = set()
        # for i in range(len(now)):
        #     for j in range(len(now)):
        #         if i == j: continue
        #         if now[i][0][0] == now[j][0][0] and now[i][0][1] == now[j][0][1]:
        #             crushed.add((now[i][0][0], now[i][0][1]))
        # answer += len(crushed)

        # 각 로봇들의 다음 갈 곳 q에 넣기
        for i in range(len(now)):
            ri = now[i][1]  # 로봇 번호
            lv = now[i][2]  # 현재 목표 포인트 인덱스
            
            # 경로 범위 체크
            if ri >= len(routes) or ri < 0:
                continue
                
            # 이미 마지막 포인트에 도달했거나 lv+1이 경로 범위를 벗어나면 스킵
            if lv >= len(routes[ri]) - 1 or lv + 1 >= len(routes[ri]):
                continue
            
            current_pos = now[i][0]  # 현재 위치
            
            # 인덱스 범위 체크
            target_point_idx = routes[ri][lv+1] - 1
            if target_point_idx < 0 or target_point_idx >= len(points):
                continue
                
            target_pos = points[target_point_idx]  # 목표 포인트 위치
            
            # 현재 위치가 목표 포인트와 일치하는지 확인
            if current_pos[0] == target_pos[0] and current_pos[1] == target_pos[1]:
                # 목표 포인트에 도달했으므로 다음 포인트로 업데이트
                new_lv = lv + 1
                
                # 모든 포인트를 방문했는지 확인
                if new_lv >= len(routes[ri]) - 1:
                    continue  # 더 이상 갈 곳이 없음
                
                # 다음 목표 포인트를 향해 한 칸 이동
                if new_lv + 1 < len(routes[ri]):  # 인덱스 범위 체크
                    next_target_idx = routes[ri][new_lv+1] - 1
                    if next_target_idx >= 0 and next_target_idx < len(points):  # 인덱스 범위 체크
                        next_target_pos = points[next_target_idx]
                        r, c = get_next_rc(current_pos, next_target_pos)
                        q.append(([r, c], ri, new_lv))
            else:
                # 아직 목표 포인트에 도달하지 않았으므로 계속 이동
                r, c = get_next_rc(current_pos, target_pos)
                q.append(([r, c], ri, lv))
    
    return answer

"""
bfs?
"""