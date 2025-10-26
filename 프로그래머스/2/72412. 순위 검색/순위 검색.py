from collections import defaultdict
from itertools import product

def solution(info, query):
    answer = [0] * len(query)
    lans = ['cpp', 'java', 'python']
    jobs = ['backend', 'frontend']
    careers = ['junior', 'senior']
    foods = ['chicken', 'pizza']
    
    applicants = defaultdict(list)
    zero_one = list(product([True, False], repeat=4))
    
    for i in info:
        lan, job, career, food, score = i.split(" ")
        score = int(score)
        tup = (lan, job, career, food)
        applicants[tup].append(score)
        applicants[('-', '-', '-', '-')].append(score)
        
        for zo in zero_one:
            if zo == (False, False, False, False) or zo == (True, True, True, True): continue
            tup = (lan if zo[0] else '-', job if zo[1] else '-', career if zo[2] else '-', food if zo[3] else '-')
            applicants[tup].append(score)
            

    for a in applicants:
        applicants[a].sort(key=lambda x: -x)
        
            
    for i, q in enumerate(query):
        lan, _, job, _, career, _, food, score = q.split(" ")
        score = int(score)
        
        scores = applicants[(lan, job, career, food)]
        
        low = 0
        high = len(scores)
        mid = (low+high) // 2
        
        while low < high:
            mid = (low+high) // 2
            if scores[mid] >= score:
                low = mid+1
            else:
                high = mid

        answer[i] += high
        
        
    return answer

"""
각 문의조건에 해당하는 사람들의 숫자를 순서대로 배열에 담아 return

"언어 and 직군 and 경력 and 소울푸드 코테점수"


"""