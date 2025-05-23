import heapq

def solution(routes):
    answer = 0
    
    q = []
    for route in routes:
        heapq.heappush(q, route)
        
    min_end = int(1e9)
    
    while q:
        start, end = heapq.heappop(q)
        # start가 min_end보다 크면 min_end 자리에 설치, min_end 새로 지정
        
        if start > min_end:
            answer += 1
            min_end = end
        else:
            min_end = min(end, min_end)
        
    answer += 1
    return answer

"""
모든 차량이 한번은 단속용 카메라를 만나야 한다.
최소 카메라 수?


                    [C]                                 [C]
-20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10 -9 -8 -7 -6 -5 -4 -3
<----------------------------------------->
<---------------------->
        <---------------------->
                        <--------------------------------->
                                                        <------->

겹치는 차량이 줄어들 때 그 직전에 설치?








-30000 -29999 -29998 ... -1 0 1 2 3 ... 29999 30000
"""