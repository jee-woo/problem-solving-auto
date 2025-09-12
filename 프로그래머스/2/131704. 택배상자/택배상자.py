def solution(order):
    answer = 0
    
    # 컨테이너 벨트
    # [1, 2, 3, 4, 5, ...]
    
    o_i = 0
    n = len(order)
    stack = []
    
    for now in range(1, n + 1):
        if o_i >= n: break
        if order[o_i] == now:
            answer += 1
            o_i += 1

        else:
            stack.append(now)
        while stack and stack[-1] == order[o_i]:
            answer += 1
            o_i += 1
            stack.pop()
    
    return answer


"""
영재가 몇 개의 상자를 실을 수 있는지 return


컨테이너 벨트
-----------------
1, 2, 3, ..., n 
-----------------

보조 컨테이너 벨트 (스택)
-----------
| 1, 2, 3
-----------




"""