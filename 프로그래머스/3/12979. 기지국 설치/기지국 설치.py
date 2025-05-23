def solution(n, stations, w):
    answer = 0
    last_coverage = 0
    stations.append(n + w + 1)
    for station in stations:
        now_start = station - w
        
        apt_count = now_start - last_coverage - 1
        
        remain = apt_count % (w * 2 + 1)
        plus = 1 if remain > 0 else 0
        answer += apt_count // (w * 2 + 1) + plus
        
        last_coverage = station + w
        # print(station, now_start, answer)

    
    return answer

"""
최소 증설해야 할 기지국 개수?

아파트 개수
1 <= n <= 200_000_000

1 <= stations 개수 <= 10_000


기존 station들 사이사이마다 몇개의 기지국이 더 필요한지 계산


"""