from collections import defaultdict, Counter
from itertools import combinations
import math

def combinations_manual(n, r):
    # n! / (r! * (n-r)!)
    return math.factorial(n) // (math.factorial(r) * math.factorial(n - r))

def solution(weights):
    answer = 0
    n = len(weights)
    torques = defaultdict(set)
    couples = set()
    w_set = set(weights)
    counter_set = Counter(weights)
    for c in counter_set:
        cnt = counter_set[c]
        if cnt >= 2:
            answer += combinations_manual(cnt, 2)
    
    combs = combinations(list(w_set), 2)
    
    for comb in combs:
            a, b = comb
            for m in range(2, 5):
                at = a * m
                for mm in range(2, 5):
                    bt = b * mm
                    if at == bt:
                        # 무게 a를 가진 사람 수 * 무게 b를 가진 사람 수
                        answer += counter_set[a] * counter_set[b]
                        # 시소 짝꿍 조건을 만족하는 비율은 a, b 쌍에 대해 하나만 존재하므로 break 가능
                        break 
                if at == bt:
                    break
    
    return answer

"""
시소 짝꿍이 몇 쌍 존재하는지 구하여 return

중심으로부터 2(m), 3(m), 4(m) 거리의 지점에 좌석이 하나씩
탑승한 사람의 무게 * 시소 축과 좌석 간의 거리
2 <= n <= 100,000

180 * 4 == 360 * 2

정렬 후 이분탐색?
2, 3, 4 모두 곱한 값들을 넣고 인덱싱해서 이분탐색?

"""