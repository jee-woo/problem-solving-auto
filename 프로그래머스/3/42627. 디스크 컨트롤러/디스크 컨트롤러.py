import heapq

def solution(jobs):
    total = 0
    now = 0  # 현재 시점을 나타내는 변수
    i = 0    # jobs 배열을 가리키는 인덱스
    start = -1 # 마지막으로 작업을 시작한 시간
    heap = []
    
    while i < len(jobs):
        for job in jobs:
            if start < job[0] <= now:
                heapq.heappush(heap, (job[1], job[0]))
        
        if len(heap) > 0: # 힙에 처리할 작업이 있다면
            take_time, request_time = heapq.heappop(heap)
            start = now
            now += take_time
            total += (now - request_time)
            i += 1 # 처리한 작업 개수 증가
        else: # 힙이 비었다면
            # 3. 다음 작업의 요청 시간으로 현재 시간을 점프
            now += 1
            
    return total // len(jobs)