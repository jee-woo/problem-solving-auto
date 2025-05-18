import heapq

def solution(operations):
    answer = [0, 0]
    max_heap = []
    min_heap = []
    deleted = set()
    
    for i in range(len(operations)):
        op = operations[i]
        command, num = op.split()
        if command == 'I':
            heapq.heappush(max_heap, (-int(num), i))
            heapq.heappush(min_heap, (int(num), i))
        elif command == 'D':
            if int(num) == 1:
                while True and max_heap:
                    num, idx = heapq.heappop(max_heap)
                    if idx in deleted:
                        continue
                    deleted.add(idx)
                    break
            else:
                while True and min_heap:
                    num, idx = heapq.heappop(min_heap)
                    if idx in deleted:
                        continue
                    deleted.add(idx)
                    break
    
    while True and max_heap:
        num, idx = heapq.heappop(max_heap)
        if idx in deleted:
            continue
        answer[0] = -num
        break
    while True and min_heap:
        num, idx = heapq.heappop(min_heap)
        if idx in deleted:
            continue
        answer[1] = num
        break
    
    return answer