import math

def solution(k, d):
    answer = 0
    # x를 k의 배수만큼 증가시키면서 반복합니다.
    for x in range(0, d + 1, k):
        # 원의 방정식으로 최대 y값을 계산합니다.
        y = math.sqrt(d**2 - x**2)
        # y를 k로 나누고 1을 더해, 해당 x에 대해 가능한 k의 배수 y의 개수를 구합니다.
        answer += y // k + 1
    return answer