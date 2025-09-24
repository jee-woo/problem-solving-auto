def solution(numbers):
    answer = []
    for x in numbers:
        # 1. x가 짝수인 경우
        if x % 2 == 0:
            answer.append(x + 1)
            continue
        # 2. x가 홀수인 경우
        # 가장 오른쪽에 있는 '0'의 위치(자릿값)를 찾고,
        # 그 자릿값의 절반을 더해준다.
        p = 1
        while True:
            # x와 p를 AND 연산해서 0이 아니면, 해당 비트는 1이라는 의미
            if (x & p) == 0:
                break
            p <<= 1 # 왼쪽으로 한 칸씩 이동

        # p는 가장 오른쪽 '0'의 자릿값 (예: 8, 2진수 1000)
        # p >> 1은 그 오른쪽 비트의 자릿값 (예: 4, 2진수 0100)
        result = x + (p >> 1)
        answer.append(result)
            
    return answer