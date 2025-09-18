# 셔틀 운행 횟수 n
# 셔틀 운행 간격 t
# 한 셔틀에 탈 수 있는 최대 크루 수 m
# 크루가 대기열에 도착하는 시각을 모은 배열 timetable

def minute_to_time(minute):
    hour = minute//60
    return ":".join([str(hour).zfill(2), str(minute - hour * 60).zfill(2)])
    
def solution(n, t, m, timetable):
    answer = ''
    now = 9 * 60 # 09:00
    C = len(timetable)
    
    times = []
    
    for time in timetable:
        hour, minute = map(int, time.split(":"))
        times.append(hour*60+minute)
        
    times.sort()
    # print(times)
    last_idx = 0
    count = 0
    bus_count = 0
    
    # t분씩 시간이 흐름
    while now < 24 * 60 and bus_count < n:
        bus_count += 1
        now_count = 0
        # print('now', now)
        for i in range(last_idx, C):
            # print('times[i]', times[i], now, now_count, m)
            if times[i] <= now and now_count < m:
                now_count += 1
                last_idx += 1
                continue
            break
        # print(now_count)
        
        # now_count만큼 더했는데 더이상 버스가 없다면
        # 마지막 탑승 승객보다 1분 빠른 시각으로 리턴
        if bus_count == n:
            if now_count == m:
                return minute_to_time(times[last_idx-1]-1)
            else:
                return minute_to_time(9*60 + (n-1) * t)
        
        count += now_count
        now += t
        
        if count >= C: break
        # 만약 다른 승객들이 모두 탔고 자리가 남았다면,
        # 마지막 버스에 타기
        
        # 만약 현재 셔틀에 한자리만 남았다면,
        # 현재까지 탄 승객들의 바로 뒤 승객 시간보다는 1분 빠른 시각에 도착하기
        
    
    return answer


"""
09:00부터 총 n회 t분 간격으로 역에 도착하며, 하나의 셔틀에는 최대 m명의 승객이 탈 수 있다.

콘이 셔틀을 타고 사무실로 갈 수 있는 도착 시각 중 제일 늦은 시각을 구하여라.
단, 콘은 게으르기 때문에 같은 시각에 도착한 크루 중 대기열에서 제일 뒤에 선다.

"""