import heapq

def str_to_min(book_str):
    hs, ms = book_str.split(':')
    h = int(hs)
    m = int(ms)
    return h * 60 + m

def solution(book_time):
    n = len(book_time)
    book_time_num = [[0, 0] for _ in range(n)]
    
    # 1. book_time 시간으로 환산
    for i, [s, e] in enumerate(book_time):
        s = str_to_min(s)
        e = str_to_min(e)
        
        # 2. 퇴실 후 10분 더하기
        e += 10
        
        book_time_num[i] = [s, e]
    
    # 3. 배열 정렬
    book_time_num = sorted(book_time_num, key=lambda x: x[0])
    
    q = [(book_time_num[0][1], book_time_num[0][0])]
    for i in range(1, n):
        s, e = book_time_num[i]
        fe, fs = q[0]

        if fe > s:
            heapq.heappush(q, (e, s))
        else:
            heapq.heappop(q)
            heapq.heappush(q, (e, s))
    
    answer = len(q)
    
    return answer

"""
코니에게 필요한 최소 객실의 수를 return

한 번 사용한 객실은 퇴실 시간을 기준으로 10분간 청소를 하고 다음 손님들이 사용


1. book_time 시간으로 환산
2. 예약시간 + 10분 청소 시간 더하기
3. 시작 시간 순서대로 배열 정렬
    우선순위 큐에 하나씩 넣기. 가장 빠르게 끝나는 시간 순으로 큐 정렬
    - 가장 빠르게 끝나는 시간보다 현재 시작 시간이 빠르면 우선순위 큐에 추가
    - 아니면 가장 빠르게 끝나는 예약을 우선순위 큐에서 빼고 새 예약 추가

그리디

"""