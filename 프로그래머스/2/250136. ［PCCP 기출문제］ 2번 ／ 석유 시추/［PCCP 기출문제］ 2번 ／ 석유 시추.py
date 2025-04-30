from collections import deque
def bfs(si, sj, land, n, m, visited, li):
    visited[si][sj] = li
    di = [-1, 0, 0, 1]
    dj = [0, -1, 1, 0]
    size = 0
    q = deque()
    q.append((si, sj))
    
    while q:
        i, j = q.popleft()
        size += 1
        for k in range(4):
            ni = i + di[k]
            nj = j + dj[k]
            if ni < 0 or nj < 0 or ni >= n or nj >= m: continue
            if visited[ni][nj] or land[ni][nj] == 0: continue
            q.append((ni, nj))
            visited[ni][nj] = li
    
    return size
    

def solution(land):
    max_oil = 0
    n = len(land) # 세로
    m = len(land[0]) # 가로
    
    # 덩어리 번호와 크기 구하기
    loaf_nums = [[0 for _ in range(m)] for _ in range(n)]
    sizes = [0]
    li = 1
    for i in range(n):
        for j in range(m):
            if loaf_nums[i][j] or land[i][j] == 0: continue
            loaf_size = bfs(i, j, land, n, m, loaf_nums, li)
            li += 1
            sizes.append(loaf_size)
    
    # print(sizes)
    # print(loaf_nums)
    loaf_count = len(sizes)
    
    for j in range(m): # 가로로 시추관 위치 옮기면서
        extracted = [False] * loaf_count
        oil = 0
        for i in range(n): # 세로로 들어가면서
            if land[i][j] == 0: continue
            num = loaf_nums[i][j]
            if extracted[num]: continue
            extracted[num] = True
            oil += sizes[num]
        max_oil = max(max_oil, oil)
    
    return max_oil

"""
bfs?
dfs?


extracted[li] = 현재 가로 위치에서 i번덩어리에서 이미 기름을 추출했는지







dp[i][j] = (덩어리번호, 기름양)
"""