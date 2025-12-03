import sys
from collections import deque

# 입력 설정
input = sys.stdin.readline
R, C = 12, 6
field = [list(input().strip()) for _ in range(R)]

dr = [0, 1, 0, -1]
dc = [1, 0, -1, 0]

def bfs_find_group(sr, sc, color, current_field):
    """특정 위치에서 4개 이상 연결된 그룹의 좌표를 찾습니다."""
    q = deque([(sr, sc)])
    
    # 큐에 넣기 전, 이미 방문했다고 표시해야 중복 탐색을 막을 수 있습니다.
    # visited 대신, 이미 큐에 들어간 좌표를 저장하는 리스트를 사용
    group = [(sr, sc)]
    current_field[sr][sc] = '.' # 임시 방문 표시 (같은 색 다른 그룹이 겹치지 않도록)
    
    while q:
        r, c = q.popleft()
        
        for i in range(4):
            nr, nc = r + dr[i], c + dc[i]
            
            if 0 <= nr < R and 0 <= nc < C and current_field[nr][nc] == color:
                current_field[nr][nc] = '.' # 임시 방문 표시
                group.append((nr, nc))
                q.append((nr, nc))
                
    # 4개 미만이면 그룹을 찾지 않은 것으로 간주하고 원래 필드 상태로 복구 (임시 필드 사용 시)
    # 현재 코드에서는 리스트에 저장된 좌표만 반환하고, pop_list에서 처리합니다.
    return group

def apply_gravity(field):
    """각 열(Column)을 기준으로 중력을 효율적으로 적용합니다."""
    for j in range(C):
        temp_col = []
        # 1. 아래에서부터 뿌요만 골라냅니다.
        for i in range(R - 1, -1, -1):
            if field[i][j] != '.':
                temp_col.append(field[i][j])
        
        # 2. 필드를 초기화하고 뿌요를 아래쪽에 채워 넣습니다.
        for i in range(R):
            field[i][j] = '.'
            
        for k in range(len(temp_col)):
            # 맨 아래(11행)부터 위로 채워 넣습니다.
            field[R - 1 - k][j] = temp_col[k]


def solve():
    global field
    combo_count = 0
    
    while True:
        popped_coords = []
        # 현재 턴에서 터진 뿌요가 있는지 확인하는 플래그
        is_popped_in_this_turn = False
        visited = [[False] * C for _ in range(R)]
        
        # 1. 그룹 찾기 및 좌표 수집
        for r in range(R):
            for c in range(C):
                if field[r][c] != '.' and not visited[r][c]:
                    color = field[r][c]
                    
                    # BFS/DFS를 위해 임시 큐/리스트 사용
                    temp_group = []
                    q = deque([(r, c)])
                    temp_group.append((r, c))
                    visited[r][c] = True
                    
                    # 실제 그룹 찾기 BFS
                    while q:
                        cr, cc = q.popleft()
                        
                        for i in range(4):
                            nr, nc = cr + dr[i], cc + dc[i]
                            
                            if 0 <= nr < R and 0 <= nc < C and not visited[nr][nc] and field[nr][nc] == color:
                                visited[nr][nc] = True
                                temp_group.append((nr, nc))
                                q.append((nr, nc))

                    # 2. 터뜨릴지 결정
                    if len(temp_group) >= 4:
                        popped_coords.extend(temp_group)
                        is_popped_in_this_turn = True
        
        # 3. 터뜨린 뿌요가 없으면 연쇄 종료
        if not is_popped_in_this_turn:
            break
            
        # 4. 연쇄 횟수 증가
        combo_count += 1
        
        # 5. 필드에 반영 (터뜨리기)
        for r, c in popped_coords:
            field[r][c] = '.'
            
        # 6. 중력 적용
        apply_gravity(field)
        
    return combo_count

print(solve())