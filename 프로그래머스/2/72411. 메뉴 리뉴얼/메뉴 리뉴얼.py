import collections

def get_combinations(arr, cnt):
    combination = []
    visited = [False] * len(arr)
    def dfs(level, comb, start):
        if level == cnt:
            combination.append(comb)
        if level >= len(arr): return
        for i in range(start, len(arr)):
            if visited[i]: continue
            visited[i] = True
            dfs(level+1, comb + arr[i], i)
            visited[i] = False

    dfs(0, '', 0)
    # print(combination)
    return combination

def solution(orders, course):
    answer = []
    n = len(orders)
    counter_set = collections.Counter([])
    # comb_visited = set()
    
    for order in orders:
        order_arr = list(order)
        order_arr.sort()
        
        for cnt in course:
            combinations = get_combinations(order_arr, cnt)
            
            for combination in combinations:
                # if combination in comb_visited: continue
                # comb_visited.add(combination)
                counter_set[combination] += 1

    for num in course:
        max_cnt = 0
        for element, count in counter_set.most_common():
            if len(element) != num: continue
            if len(element) == num:
                max_cnt = max(max_cnt, count)
            if max_cnt == count and max_cnt >= 2:
                answer.append(element)
        
    # print(counter_set)
    answer.sort()
    return answer

"""
1. 각 orders[i]에 대해서 course[j] 개수만큼 조합 구하기
    -> counter set에 개수 저장
2. counter set[조합] >= 2인 경우에 answer에 추가
    가장 많은 주문!
3. answer 정렬


2 <= n <= 20
2 <= len(orders[i]) <= 10
1 <= len(course) <= 10 오름차순: 낮은 숫자 개수 저장 가능
2 <= course[i] <= 10
코스요리를 구성하는 단품메뉴들의 갯수가 담긴 배열 course

새로 추가하게 될 코스요리의 메뉴 구성을 문자열 형태로 배열에 담아 return
코스요리 메뉴는 최소 2가지 이상의 단품메뉴로 구성

최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합에 대해서만 코스요리 메뉴 후보에 포함
정답은 각 코스요리 메뉴의 구성을 문자열 형식으로 배열에 담아 사전 순으로 오름차순 정렬해서 return


2개 이상 조합부터 몇명에게 주문됐는지 확인

A B C F G -> 2: AB, AC, AF, AG, BC, BF, BG, CF, CG, FG: 5C2 = 10
             3: ABC, ... = 10
             4: ABCF, ... = 5
             5: ABCFG = 1

CounterSet?


"""