def solution(n):
    answer = []
    triangle = [[1 for _ in range(i)] for i in range(1, n+1)]
    m = 0
    for i in range(n):
        m += len(triangle[i])

    def fill_tri(level, start):
        # print(level, start)
        now = start
        
        if now == m:
            triangle[(level-1)*2][len(triangle[(level-1)*2]) // 2] = now
            return now+1
        
        # 왼쪽 아래로 대각선
        for i in range((level-1)*2, n-level):
            triangle[i][level-1] = now
            now += 1
            if now > m: return now
            # print(triangle, 'left down')
        
            
        # 아래쪽 직선
        # print('------below -------', level)
        
        for i in range(level-1, len(triangle[n-level])-level):
            triangle[n - level][i] = now
            now += 1
            if now > m: return now
            # print(triangle, 'below', now)
            
        # if start > m: return now
    
        # print('------left up -------')
        # 왼쪽 위로 대각선
        for i in range(n-level, (level-1)*2, -1):
            triangle[i][len(triangle[i])-level] = now
            now += 1
            if now > m:
                # print('return', now, triangle)
                return now
            # print(triangle, 'left up')
        
        return now
    
    start = 1
    # fill_tri(1, 1)
    for i in range(1, n):
        start = fill_tri(i, start)
        # print(triangle, start)
        if start > m: break
        
    # print(triangle)
    
    return [element for row in triangle for element in row]

"""
반복
(n-1)*3까지 삼각형 채우기
하나 안에 삼각형 채우기
두개 안에 삼각형 채우기
...


level = 1 -> 0
level = 2 -> 2
level = 3 -> 4
level = 4 -> 6


  1
 2  6
3  4 5

n=1 -> 1
n=2 -> 1
n=3 -> 1바퀴
n=4 -> 2바퀴
n=5 -> 2바퀴
n=6 -> 2바퀴
n=7 -> 3바퀴
n=8 -> 3
n=9 -> 3
n=10 -> 


"""