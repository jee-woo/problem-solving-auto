

def solution(s):
    answer = int(1e9)
    n = len(s)
    
    # 문자 압축 함수
    def zip_str(length):
        s_arr = []
        k = 0
        while k < n:
            s_arr.append(s[k:min(n, k+length)])
            k += length
        
        zipped = ""
        m = len(s_arr)
        i = 0
        while True:
            if i >= m: break
            cnt = 0
            for j in range(1, m):
                if i+j >= m: break
                if s_arr[i+j] != s_arr[i]: break
                cnt += 1
            if cnt >= 1:
                zipped = zipped + str(cnt+1) + s_arr[i]
            else:
                zipped = zipped + s_arr[i]
            i += cnt+1
        return zipped
        
    # 압축 길이 1~n
    for i in range(1, n+1):
        zipped = zip_str(i)
        answer = min(len(zipped), answer)
    
    return answer

"""
1개 이상 단위로 문자열을 잘라 압축하여 표현한 문자열 중 가장 짧은 것의 길이를 return

1 <= n <= 1000

단위
1
2
3
4
...
1000

"""