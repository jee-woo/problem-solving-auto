def solution(n, s):
    answer = []
    if n > s:
        return [-1]
    
    share = s // n
    remain = s % n
    
    for i in range(n):
        answer.append(share)
    
    for i in range(remain):
        answer[n-i-1] += 1
    
    return answer

"""
1 <= n <= 10_000
1 <= s <= 100_000_000 (1억)

n = 10_000
s = 10_000
[1, 1, 1, 1, 1, 1, ..., 1]

n = 100
s = 100_000_000
[1, 1, 1, 1, ..., 99_999_901]
[1, 1, 1, 1, ..., 2, 99_999_900]

n = 3
s = 11
[3, 4, 4]

11 % 3 = 2


곱이 가장 크려면?
숫자들이 균일해야 한다.

"""