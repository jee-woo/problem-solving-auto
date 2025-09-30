from collections import deque

#        다리 최대 트럭 개수, 견딜 수 있는 무게, 대기 트럭
def solution(bridge_length, weight, truck_weights):
    truck_q = deque(truck_weights)
    
    passed_cnt = 0
    
    bridge_w = 0
    bridge_q = deque()
    time = 0
    bridge_cnt = 0
    
    for i in range(bridge_length):
        bridge_q.append(0)
    
    n = len(truck_weights)
    
    # weight 넘치면 q에 0을 넣기
    while passed_cnt < n:
        # print(bridge_q, bridge_w, bridge_cnt, truck_q[0])
        # truck 다리위에
        # truck = truck_q.popleft()
        truck = 0
        if truck_q:
            truck = truck_q[0]
        
        # 다리위 한칸 앞으로
        if bridge_q:
            popped = bridge_q.popleft()
            bridge_w -= popped
            if popped > 0:
                bridge_cnt -= 1
                passed_cnt += 1
        
        if bridge_w + truck > weight:
            bridge_q.append(0)
        elif bridge_cnt+1 <= bridge_length and truck_q:
            truck_q.popleft()
            bridge_q.append(truck)
            bridge_w += truck
            bridge_cnt += 1
        
        time += 1
        # print(bridge_q, bridge_w, bridge_cnt, truck_q)
    
    return time

"""
모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return


0   [ , ]
1   [ ,7]
2   [7, ]
3   [ ,4]
4   [4,5]
5
6
7
8
9

"""