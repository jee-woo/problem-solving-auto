def is_possible(level, diffs, times, limit, n):
    spent = 0
    for i in range(n):
        if level >= diffs[i]:
            spent += times[i]
            continue
        spent += (times[i] + times[i-1]) * (diffs[i] - level) + times[i]
    if spent <= limit:
        return True
    return False

def solution(diffs, times, limit):
    n = len(diffs)
    l = 1
    r = 10 ** 15
    
    while l < r:
        mid = (l+r) // 2
        if is_possible(mid, diffs, times, limit, n):
            r = mid
        else:
            l = mid + 1

    return r

"""
level을 정하라
이분탐색?

"""