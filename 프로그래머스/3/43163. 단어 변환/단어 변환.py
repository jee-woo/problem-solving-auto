from collections import deque

def is_possible(word1, word2):
    diff = 0
    
    for i in range(len(word1)):
        if word1[i] != word2[i]:
            diff += 1
        if diff > 1:
            return False
    
    return True

def solution(begin, target, words):
    answer = 0
    
    q = deque()
    visited = set()
    
    q.append((begin, 0))

    while q:
        now, count = q.popleft()
        
        if now == target:
            answer = count
            break
        
        for word in words:
            if word in visited or not is_possible(word, now):
                continue
            q.append((word, count+1))
            visited.add(word)
    
    return answer

"""
3 <= 단어 길이 <= 10
3 <= words 길이 <= 50

["hot", "dot", "dog", "lot", "log", "cog"]

hit - hot
  hot - dot, lot
  dot - dog
    dog - cog


"""