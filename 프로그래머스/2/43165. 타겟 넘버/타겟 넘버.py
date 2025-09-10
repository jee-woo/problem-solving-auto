def solution(numbers, target):
    answer = 0
    n = len(numbers)
    
    def dfs(num, level, route):
        nonlocal answer
        if level == n:
            if num == target:
                answer += 1
            return
        dfs(num + numbers[level], level + 1, route + [+numbers[level]])
        dfs(num - numbers[level], level + 1, route + [-numbers[level]])
    
    dfs(0, 0, [])
    
    return answer

"""
dfs

"""