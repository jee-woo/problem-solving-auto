def solution(str1, str2):
    answer = 0
    MUL = 65536
    
    hap = 0
    gyo = 0
    
    # 두글자씩 끊기
    n1 = len(str1)
    n2 = len(str2)
    
    couple1 = dict()
    couple2 = dict()
    
    for i in range(1, n1):
        c = str1[i-1:i+1]
        if not c.isalpha(): continue
        C = c.upper()
        if C not in couple1: couple1[C] = 0
        couple1[C] += 1
    
    for i in range(1, n2):
        c = str2[i-1:i+1]
        if not c.isalpha(): continue
        C = c.upper()
        if C not in couple2: couple2[C] = 0
        couple2[C] += 1
    
    # 둘다 공집합일 경우
    if len(couple1) == 0 and len(couple2) == 0:
        return 1 * MUL
    
    # 합집합 구하기
    # 교집합 구하기
    for c in couple1:
        if c in couple2:
            hap += max(couple1[c], couple2[c])
            gyo += min(couple1[c], couple2[c])
        else:
            hap += couple1[c]
    for c in couple2:
        if c in couple1: continue
        hap += couple2[c]
        
    # print(hap, gyo)
    
    return int((gyo / hap) * MUL)


"""
2 <= len(str1), len(str2) <= 1000

자카드 유사도 J(A, B)는 두 집합의 교집합 크기를 두 집합의 합집합 크기로 나눈 값
len(교집합) / len(합집합)

집합 A = {1, 2, 3}, 집합 B = {2, 3, 4}
교집합 A ∩ B = {2, 3}, 합집합 A ∪ B = {1, 2, 3, 4}이 되므로,
집합 A, B 사이의 자카드 유사도 J(A, B) = 2/4 = 0.5

집합 A와 집합 B가 모두 공집합일 경우에는 나눗셈이 정의되지 않으니 따로 J(A, B) = 1로 정의한다.

문자열 -> 두 글자씩 끊어서 다중집합

- 문자열 두 글자씩 끊어서 저장
    - 모든 글자 대문자화
    - 영문자가 아닌 숫자, 특수문자 포함된 쌍은 제외

- 합집합 구하기

- 교집합 구하기

- 유사도 계산

"""