def solution(sequence):
    answer = 0
    
    pulse1 = []
    pulse2 = []
    
    n = len(sequence)
    
    
    for i in range(n):
        num1 = sequence[i] * ((-1) ** (i+2))
        num2 = sequence[i] * ((-1) ** (i+1))
        pulse1.append(num1)
        pulse2.append(num2)
        
    def max_subarray(nums):
        best = cur = nums[0]
        L = R = 0
        start = 0
        for i in range(1, len(nums)):
            if nums[i] > cur + nums[i]:
                cur = nums[i]
                start = i
            else:
                cur += nums[i]
            if cur > best:
                best = cur
                L, R = start, i
        return best, (L, R)
    
    best1, _ = max_subarray(pulse1)
    best2, __ = max_subarray(pulse2)
    
    answer = max(best1, best2)
    
    return answer

"""
n<=500000
부분수열의 합 가장 큰 것
펄스 수열 두가지



"""