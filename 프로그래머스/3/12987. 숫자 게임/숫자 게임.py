def solution(A, B):
    answer = 0
    
    A.sort()
    B.sort()
    
    al = 0
    ar = len(A)-1
    
    for b in B:
        if al > ar:
            break
        if b > A[al]:
            answer += 1
            al += 1
        else:
            ar -= 1
    
    return answer

"""
B 팀원들이 얻을 수 있는 최대 승점

7 5 3 1
8 6 2 2

5 3 1 7
8 6 2 2


[1, 3, 5, 7]

2 2 6 8
1 7 3 5



"""