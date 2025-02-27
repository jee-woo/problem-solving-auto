import heapq

mins = [int(1e9), int(1e9)]

def solution(n, paths, gates, summits):
    global mins
    answer = []
    INF = int(1e9)
    graph = [[] for _ in range(n + 1)]
    
    for i, j, w in paths:
        graph[i].append((j, w))
        graph[j].append((i, w))
        
    # 출입구 -> 봉우리 (쉼터 intensity 최소인 경로)
    # 봉우리 -> 출입구 (동일)
    
    smap = {}
    for s in summits:
        smap[s] = True
        
    gmap = {}
    for g in gates:
        gmap[g] = True
        
    mins[0] = INF
    mins[1] = summits[0]
    
    intensity = [INF for _ in range(n + 1)]
    def dijkstra(q):
        global mins
        
        while (q):
            intens, now = heapq.heappop(q)
            # 현재 경로가 이미 찾은 최소 강도보다 크면 더 이상 탐색할 필요 없음
            if intens > mins[0]:
                continue

            # 현재 지점의 강도가 이미 계산된 강도보다 크면 스킵
            if intens > intensity[now]:
                continue
                
            if now in smap:
                if mins[0] > intens:
                    mins[0] = intens
                    mins[1] = now
                elif mins[0] == intens:
                    if mins[1] > now:
                        mins[1] = now
                # break
                continue

            for next, n_intens in graph[now]:
                if next in gmap: continue
                if intensity[next] > max(intens, n_intens):
                    intensity[next] = max(intens, n_intens)
                    heapq.heappush(q, (intensity[next], next))
    
    # for i in gates:
        # dijkstra(i)
    q = []
        
    for i in gates:
        intensity[i] = 0
        heapq.heappush(q, (0, i))
    dijkstra(q)
        

    # answer[0] = 산봉우리 번호
    # answer[1] = intensity 최솟값
    return [mins[1], mins[0]]
