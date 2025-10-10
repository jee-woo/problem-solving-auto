from itertools import combinations

def solution(relation):
    answer = 0
    
    r = len(relation)
    c = len(relation[0])
    
    indexes = [i for i in range(c)]
    
    candidates = list()
    
    for comb_len in range(1, c+1):
        for comb in combinations(indexes, comb_len):
            keys = set()
            for row in relation: # 각 row 순회
                lis = []
                for ci in comb:
                    lis.append(row[ci])
                
                tup = tuple(lis)
                keys.add(tup)
            if len(keys) == r:
                exist = False
                for s in candidates:
                    # if s in '_'.join(map(str, list(comb))):
                    exist_cnt = 0
                    for i in range(len(s)):
                        for j in range(len(comb)):
                            if s[i] == comb[j]: exist_cnt += 1
                            
                    # if s in comb:
                    if exist_cnt >= len(s):
                        exist = True
                        break
                if exist: continue
                candidates.append(comb)
    
    # print(candidates)
    
    return len(candidates)

"""
후보 키의 개수를 return

유일성(uniqueness) : 릴레이션에 있는 모든 튜플에 대해 유일하게 식별되어야 한다.
최소성(minimality) : 유일성을 가진 키를 구성하는 속성(Attribute) 중 하나라도 제외하는 경우 유일성이 깨지는 것을 의미한다. 즉, 릴레이션의 모든 튜플을 유일하게 식별하는 데 꼭 필요한 속성들로만 구성되어야 한다.

[
    ["100","ryan","music","2"]
    ["200","apeach","math","2"]
    ["300","tube","computer","3"]
    ["400","con","computer","4"]
    ["500","muzi","music","3"]
    ["600","apeach","music","2"]
]
"학번", ["이름", "전공"] -> 2개


1. 모든 조합 만들기. 길이 1~column (column index로 조합 만들기)
2. 모든 row에 대해서 조합이 relation에 하나뿐인지 확인하기
    혹은 모든 row의 조합을 set에 튜플(혹은 문자열 join)로 넣고 len이 row의 길이와 같은지 확인
    같다면 answer += 1
"""