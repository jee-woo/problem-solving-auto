# import math

# def get_dist(x1, y1, x2, y2):
    # return math.sqrt(abs(x1-x2)**2 + abs(y1-y2)**2)

def solution(k, d):
    answer = 0
    
    # a = 0
    # b = 0
    
    d = d / k
    
    x = 0
    y = int(d)
    
    # print(d)
    
    while x <= d:
        if x ** 2 + y ** 2 <= d ** 2:
            answer += (y+1)
            # print(x, y, answer)
            x += 1
        else:
            y -= 1
    
    return answer

"""
정수 k와 원점과의 거리를 나타내는 정수 d가 주어졌을 때, 점이 총 몇 개 찍히는지 return

k만큼 나눠서 좌표 축소?
d = d / k 만큼 줄여서 d = 100만, k = 1이면 축소 안됨



x^2 + y^2 = d^을 만족하는 x, y쌍?

x를 100만큼 반복하고, y가 만족하지 않으면 1씩 줄이면서 검사

a = 0, 1, 2, 3, ...
b = 0, 1, 2, 3, ...

x축 방향으로 a*k
y축 방향으로 b*k

원점과 거리가 d 넘으면 점 찍지 X




"""