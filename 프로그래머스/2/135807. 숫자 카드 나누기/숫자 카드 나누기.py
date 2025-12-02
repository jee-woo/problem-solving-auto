import math

def solution(arrayA, arrayB):
    answer = 0
    
    n = len(arrayA)
    a_gcd = arrayA[0]
    for i in range(1, n):
        a_gcd = math.gcd(a_gcd, arrayA[i])
        
    b_gcd = arrayB[0]
    for i in range(1, n):
        b_gcd = math.gcd(b_gcd, arrayB[i])
    
    a_pos = True
    b_pos = True
    for i in range(n):
        if arrayA[i] % b_gcd == 0 and a_pos:
            # return 0
            a_pos = False
        if arrayB[i] % a_gcd == 0:
            b_pos = False
    
    if not a_pos and not b_pos: return 0
    
    return max(a_gcd, b_gcd)

"""
주어진 조건을 만족하는 가장 큰 양의 정수 a를 return

1 ≤ arrayA의 길이 = arrayB의 길이 ≤ 500,000
1 ≤ arrayA의 원소, arrayB의 원소 ≤ 100,000,000

1. 철수가 가진 카드들에 적힌 모든 숫자를 나눌 수 있고 영희가 가진 카드들에 적힌 모든 숫자들 중 하나도 나눌 수 없는 양의 정수 a
2. 영희가 가진 카드들에 적힌 모든 숫자를 나눌 수 있고, 철수가 가진 카드들에 적힌 모든 숫자들 중 하나도 나눌 수 없는 양의 정수 a


최대공약수?




"""