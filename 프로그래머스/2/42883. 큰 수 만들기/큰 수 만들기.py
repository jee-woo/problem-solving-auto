import heapq

def solution(number, k):
    answer = ''
    q = []
    n = len(number)
    m = n - k
    
    si = 0
    count = 0
    answer_arr = []
    last_idx = 0
    for i in range(k+1):
        if i >= n: break
        heapq.heappush(q, (-int(number[i]), i)) #??
        
    for i in range(m):
        # print(i)
        if i+k < n:
            heapq.heappush(q, (-int(number[i+k]), i+k))
        
        while q:
            maxx, index = heapq.heappop(q)
            if index < last_idx:
                continue
            answer_arr.append(str(-maxx))
            last_idx = index
            break

        # print(answer_arr)
    answer = ''.join(answer_arr)
    return answer

"""
n = len(number)

n - k 자리수 숫자 만들기

(4, 10^9)-
(1, 10^8)-
(7, 10^7)
(7, 10^6)
(2, 10^5)-
(5, 10^4)
(2, 10^3)-
(8, 10^2)
(4, 10^1)
(1, 10^0)



"""
