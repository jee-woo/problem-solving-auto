import math


def solution(n, k):
    n_list = [i for i in range(1, n+1)]
    # k는 1-based index이므로, 0-based index로 맞추기 위해 1을 뺌
    k -= 1 
    n = len(n_list)
    result = []
    
    # 1. 사용 가능한 숫자 리스트 (정렬되어 있어야 함)
    available_nums = list(n_list)
    
    # 2. 팩토리얼 테이블 (미리 계산)
    # N의 크기가 작다면 O(N!) 전체를 계산하지 않으므로 O(N^2) 이하의 복잡도를 가짐
    factorials = [math.factorial(i) for i in range(n)]

    # 3. N-1 번째 자리부터 0 번째 자리까지 반복
    for i in range(n - 1, -1, -1):
        # 현재 자리에서 만들 수 있는 순열의 개수 (i!):
        # factorials[i]가 i! 값입니다.
        current_factorial = factorials[i]
        
        # 4. 몫(index) 계산: 현재 자리에 올 숫자의 available_nums 내 인덱스
        # k // current_factorial
        index = k // current_factorial
        
        # 5. 나머지(새로운 k) 계산
        # k % current_factorial
        k %= current_factorial
        
        # 6. 결과에 숫자 추가 및 리스트에서 제거
        result.append(available_nums.pop(index))

    return result



"""
순열을 다 구하면 시간복잡도 폭발.
다 구하지 않고 k번째만 구할 수 있는 방법?

n = 2
1 2
2 1

n = 3
[1, 2, 3]
[1, 3, 2]
[2, 1, 3]
[2, 3, 1]
[3, 1, 2]
[3, 2, 1]

n = 4
1 2 3 4
1 2 4 3
1 3 2 4
1 3 4 2
1 4 2 3
1 4 3 2

2 1 3 4
2 1 4 3
2 3 1 4
2 3 4 1
2 4 1 3
2 4 3 1

3 1 2 4
3 1 4 2
3 2 1 4
3 2 4 1
3 4 1 2
3 4 2 1





"""