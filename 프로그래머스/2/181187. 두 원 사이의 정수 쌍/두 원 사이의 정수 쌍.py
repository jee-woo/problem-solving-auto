import math

def circle_y(x, r):
    # x**2 + y**2 = r**2
    # y**2 = r**2 - x**2
    # try:
    y = math.sqrt(r**2 - x**2)
    return y
    # except ValueError as e:
        # print(e)

def solution(r1, r2):
    answer = 0
    
    max_y = r2
    min_y = r1
    # cnt = r2 - r1 + 1
    cnt = 0
    for x in range(1,r2):
        y2 = circle_y(x, r2)
        if x > r1: y1 = 0
        else: y1 =  circle_y(x, r1)
        max_y = int(y2)
        min_y = max(1, math.ceil(y1))
        cnt += max_y - min_y + 1
        # print(x, cnt)
        # print(y)
    # cnt += 1
    # print(cnt, cnt * 4 + 4)
    
    # cnt += (cnt-
    # print(cnt)
    answer = cnt * 4 + (r2 - r1 + 1) * 4
    # answer = cnt + cnt * 4
    return answer

"""
두 원 사이의 공간에 x좌표와 y좌표가 모두 정수인 점의 개수를 return
1 ≤ r1 < r2 ≤ 1,000,000

1사분면만 검사

x**2 + y**2 = r
y**2 = r - x**2

r1 - x**2 <= y**2 <= r2 - x**2
만족하는 y?

1~r2
y축과 평행하게 이동하면서 몇개 포함되는지 검사
"""