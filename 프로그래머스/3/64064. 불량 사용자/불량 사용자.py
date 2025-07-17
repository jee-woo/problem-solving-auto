def check(user, banned):
    if len(user) != len(banned):
        return False
    for i, char in enumerate(banned):
        if char == '*':
            continue
        elif user[i] != char:
            return False
    return True

def solution(user_id, banned_id):
    answer = 0
    banned_map = [[] for _ in range(len(banned_id))]
    
    for user in user_id:
        for i, banned in enumerate(banned_id):
            if check(user, banned):
                banned_map[i].append(user)
    
    answer_set = set()
    visited = set()
    # for lst in banned_map:
    #     lst.sort()
    
    def dfs(level, arr):
        if level == len(banned_id):
            answer_set.add(frozenset(arr))
            return
        
        for user in banned_map[level]:
            if user in visited: continue
            visited.add(user)
            arr.append(user)
            dfs(level + 1, arr)
            visited.remove(user)
            arr.pop()
    
    dfs(0, [])
    answer = len(answer_set)
    # print(answer_set)
    return answer

"""
["frodo", "fradi", "crodo", "abc123", "frodoc"]

["*rodo", "*rodo", "******"]



"""