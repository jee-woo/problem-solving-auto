def solution(N, number):
    answer = -1
    S = [set() for _ in range(9)]
    
    # N을 i번 반복해서 만든 숫자를 S[i]에 추가
    for i in range(1, 9):
        S[i].add(int(str(N) * i))
    
    for i in range(1, 9):
        # N을 i번 사용한 숫자들이 number와 같은지 확인
        if number in S[i]:
            return i

        # S[i] 집합을 만들기 위해 S[j]와 S[i-j]의 연산을 수행
        for j in range(1, i):
            for op1 in S[j]:
                for op2 in S[i - j]:
                    S[i].add(op1 + op2)
                    S[i].add(op1 - op2)
                    S[i].add(op1 * op2)
                    if op2 != 0:
                        S[i].add(op1 // op2)

                    # 연산 후 number와 같은지 확인
                    if op1 + op2 == number: return i
                    if op1 - op2 == number: return i
                    if op1 * op2 == number: return i
                    if op2 != 0 and op1 // op2 == number: return i

    return answer