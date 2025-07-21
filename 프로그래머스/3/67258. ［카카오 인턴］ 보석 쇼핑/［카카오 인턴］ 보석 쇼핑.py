def solution(gems):
    answer = [0, 1]
    
    n = len(gems)
    gem_set = set()
    
    for gem in gems:
        gem_set.add(gem)
        
    m = len(gem_set)
    gem_map = dict()
    
    for gem in gem_set:
        gem_map[gem] = 0
        
    gem_set.clear()
    min_len = 100_001
    
    start = 0
    end = 0
    gem_set.add(gems[start])
    gem_map[gems[start]] = 1
    
    while end < n and start <= end:
        if len(gem_set) == m:
            if end - start + 1 < min_len:
                min_len = end - start + 1
                answer = [start+1, end+1]

            if gem_map[gems[start]] >= 1:
                gem_map[gems[start]] -= 1
            if gem_map[gems[start]] == 0:
                gem_set.remove(gems[start])
            
            start += 1
        elif len(gem_set) < m:
            end += 1
            if end >= n: break
            gem_map[gems[end]] += 1
            gem_set.add(gems[end])

    
    return answer

"""
보석 종류 몇가지인지 찾기

투포인터?

"""