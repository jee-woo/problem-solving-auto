def solution(sequence, k):
    answer = []
    n = len(sequence)
    
    sums = [0] * (n+1)
    for i in range(n):
        sums[i+1] = sums[i] + sequence[i]
        
    start = 0
    end = 1
    
    min_len = 1_000_001
    last_start = start
    last_end = end
    while start < end and end <= n:
        if sums[end]-sums[start] == k:
            if end - start < min_len:
                last_start = start
                last_end = end-1
                min_len = end - start
        if sums[end]-sums[start] <= k:
            end += 1
        else:
            start += 1
    
    return [last_start, last_end]


"""
1. 부분 수열의 합이 k
2. 여러 개일 경우 길이가 짧은 수열
3. 시작 인덱스가 작은 수열




"""