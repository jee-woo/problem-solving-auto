from itertools import product

def solution(word):
    answer = 0
    arr = ['A', 'E', 'I', 'O', 'U']
    
    perm = product(arr, repeat=5)
    
    words = []
    # print(perm)
    for l in range(1, 6):
        for i, p in enumerate(product(arr, repeat=l)):
            s = ''.join(p)
            words.append(s)
                
    
    words.sort()
    
    for i in range(len(words)):
        if words[i] == word: return i+1
    
    # return answer

"""
AEIOU

A
AA
AAA
AAAA
AAAAA
AAAAE



"""