import math

def solution(begin, end):
    MAX_BLOCK_NUMBER = 10_000_000
    def get_max_divisor(num):
        max_d = 1
        for i in range(2, int(math.sqrt(num))+1):
            if num % i == 0:
                if num // i <= MAX_BLOCK_NUMBER:
                    max_d = num // i
                    break
                    # return num // i
                max_d = max(max_d, i)
        return max_d
        # return 1
    answer = []
    
    for i in range(begin, end+1):
        if i == 1: # 이미 위에서 처리했으나, 루프 시작이 1이라면
            answer.append(0)
            continue
        d = get_max_divisor(i)
        answer.append(d)
    return answer


"""
그 구간에 깔려 있는 블록의 숫자 배열을 return

최소공배수?

 1  2  3  4  5  6  7  8  9  10
[0, 1, 1, 2, 1, 3, 1, 4, 3, 5]

소수면 1
약수가 있으면 가장 큰 약수


1 2 3 4 5 6 7 8 9 10
0 o o 2 o 3 o 4 3 5

"""