from collections import Counter, defaultdict

def solution(a):
    answer = 0
    n = len(a)
    if n < 2: return 0
    cs = Counter()
    
    for i, num in enumerate(a):
        cs[num] += 1
        
    sorted_cs = cs.most_common()
    
    for k, v in sorted_cs:
        if v <= answer / 2: break
        current_len = 0
        i = 0
        
        # 3. k를 공통 원소로 하는 유효한 짝을 탐욕적으로 찾기 (Greedy Scan)
        while i < n - 1:
            pair = (a[i], a[i+1])
            is_valid_pair = k in pair and a[i] != a[i+1]
            if is_valid_pair:
                current_len += 2
                i += 2
            else:
                i += 1
        answer = max(answer, current_len)
    return answer

"""
a의 모든 부분 수열 중에서 가장 길이가 긴 스타 수열의 길이를 return

x의 길이를 2n이라 할 때, 다음과 같은 n개의 집합
{x[0], x[1]}, {x[2], x[3]}, ..., {x[2n-2], x[2n-1]}
의 교집합의 원소의 개수가 1 이상입니다.

1 <= len(a) <= 500_000


제일 길려면 특정 숫자가 x쌍 있어야 한다.

[0,3,3,0,7,2,0,2,2,0]
0: 4개
3: 2
7: 1
2: 3

[5,2,3,3,5,3]
5: 2
2: 1
3: 3 -> 첫 3부터 마지막 3이 길이가 4임

"""