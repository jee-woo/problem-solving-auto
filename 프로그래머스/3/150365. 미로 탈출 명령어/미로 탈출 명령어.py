# from collections import deque
import heapq

def solution(n, m, x, y, r, c, k):
    answer = 'z' # 어차피 lrud만 사용
    
    x -= 1
    y -= 1
    r -= 1
    c -= 1
    
    distance = abs(x - r) + abs(y - c)
    if distance > k: return 'impossible'
    if distance % 2 > 0 and k % 2 == 0 or distance % 2 == 0 and k % 2 > 0:
        return 'impossible'
    
    # visited = [[[0] * 4 for _ in range(m)] for _ in range(n)]
    # visited = set()
    visited = [[set() for _ in range(m)] for _ in range(n)]
    
    # q = deque([(x, y, '')])
    q = [('', x, y)] # way, x, y
    
    d = ['d', 'l', 'r', 'u']
    dx = [1, 0, 0, -1]
    dy = [0, -1, 1, 0]
    
    while q:
        # now_x, now_y, now_way = q.popleft()
        now_way, now_x, now_y = heapq.heappop(q)
        cnt = len(now_way)
        
        # k 길이이면 멈춤
        if cnt == k:
            # print(now_way, now_x, now_y)
            # print(visited)
            if now_x == r and now_y == c and now_way < answer:
                answer = now_way
            continue
        
        for i in range(4):
            next_x = now_x + dx[i]
            next_y = now_y + dy[i]
            if next_x < 0 or next_x >= n or next_y < 0 or next_y >= m: continue
            # if (next_x, next_y, now_way) in visited: continue
            # visited.add((next_x, next_y, now_way))
            if now_way in visited[next_x][next_y]: continue
            if abs(next_x - r) + abs(next_y - c) > (k-cnt): continue
            visited[next_x][next_y].add(now_way)
            q.append((now_way + d[i], next_x, next_y))
            break
    
    if answer == 'z': return 'impossible'
    return answer

"""
(x, y)에서 (r, c)까지 이동하는 거리가 총 k여야 합니다.
이때, (x, y)와 (r, c)격자를 포함해, 같은 격자를 두 번 이상 방문해도 됩니다.

미로에서 탈출한 경로를 문자열로 나타냈을 때, 문자열이 사전 순으로 가장 빠른 경로로 탈출해야 합니다.
l r u d

- 이동거리 k이면 멈춤
- visited는 이동거리에 따라 저장
- 도착지이면서 이동거리가 k이면 기존 answer과 비교해서 사전순으로 앞서는지 확인
- 탈출 못하면 'impossible' return


d, l, r, u 순으로 
다익스트라


"""