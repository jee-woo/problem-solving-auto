def solution(n, queries, answers):
    count = 0
    m = len(queries)

    # 백트래킹 함수
    def backtrack(level, selected):
        nonlocal count

        if level == m:
            # 모든 쿼리를 통과했으면 정답 후보 +1
            if bin(selected).count('1') == 5:
                count += 1
            return
        
        # 현재 쿼리 검사
        match = 0
        for num in queries[level]:
            if selected & (1 << (num - 1)):
                match += 1
        
        if match != answers[level]:
            return  # 지금까지 고른 selected로는 불가능하니까 가지치기

        # 다음 쿼리로 넘어감
        backtrack(level + 1, selected)
    
    # 처음 시작: 1~n 중 5개 고르기
    def select_numbers(start, selected, picked):
        if picked == 5:
            backtrack(0, selected)
            return
        if start > n:
            return
        # 고른다
        select_numbers(start + 1, selected | (1 << (start - 1)), picked + 1)
        # 안 고른다
        select_numbers(start + 1, selected, picked)

    select_numbers(1, 0, 0)
    return count
