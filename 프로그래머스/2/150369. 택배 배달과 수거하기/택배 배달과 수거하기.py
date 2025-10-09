def solution(cap, n, deliveries, pickups):
    move = 0
            
    # 왕복하면서 배달/수거
    
    to_del = 0
    to_pick = 0
    deled = 0
    picked = 0
    for i in range(n):
        if deliveries[i] > 0: to_del += deliveries[i]
        if pickups[i] > 0: to_pick += pickups[i]
        
    di = n-1
    pi = n-1
    last_di = di
    last_pi = pi
    if to_del == 0: di = 0
    if to_pick == 0: pi = 0
    while to_del > deled or to_pick > picked:
        # 가장 먼 장소 구하기
        for i in range(last_di, -1, -1):
            if deliveries[i] > 0:
                di = i
                break
        for i in range(last_pi, -1, -1):
            if pickups[i] > 0:
                pi = i
                break
        
        move += (max(di, pi)+1) * 2
        # 가면서 배달
        del_box = min(cap, to_del - deled)
        last_di = di
        last_pi = pi
        for i in range(last_di, -1, -1): # 실제로는 가면서지만 논리상 멀리부터
            if del_box == 0: break
            if deliveries[i] == 0:
                di = i
                continue
            now_del = min(deliveries[i], del_box)
            
            deliveries[i] -= now_del
            del_box -= now_del
            deled += now_del
            # di = i
            di = max(0, i-1)
        
        # 오면서 수거
        pick_box = 0
        for i in range(last_pi, -1, -1):
            if pick_box >= cap: break
            if pickups[i] == 0:
                pi = i
                continue
            now_pick = min(pickups[i], cap - pick_box)
            pickups[i] -= now_pick
            pick_box += now_pick
            picked += now_pick
            # pi = i
            pi = max(0, i-1)

        # print(deliveries, to_del, deled, di, pi)
        # print(pickups, to_pick, picked, di, pi)
        # print(move)
    
    return move

# print(solution(1, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]), 52)

"""
트럭 하나로 모든 배달과 수거를 마치고 물류창고까지 돌아올 수 있는 최소 이동 거리를 return

1. 가장 멀리있는 배송지 구하기
2. 가장 멀리부터 가까운곳까지 왕복하면서 배달/수거
    - 가면서 배달
    - 오면서 수거





"""