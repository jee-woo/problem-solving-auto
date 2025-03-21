import sys
input = sys.stdin.readline
sys.setrecursionlimit(100000)

# 입력
str1 = input().strip()
str2 = input().strip()

n1, n2 = len(str1), len(str2)
# dp[i][j] : str1[0..i]와 str2[0..j]에 대한 LCS (길이와 결과 리스트)
dp = [[None] * n2 for _ in range(n1)]

def lcs(i, j):
    # 기본 케이스: 둘 중 하나가 인덱스 범위 밖이면, LCS는 빈 리스트(길이 0)
    if i < 0 or j < 0:
        return (0, [])
    
    if dp[i][j] is not None:
        return dp[i][j]
    
    # 두 문자가 같을 경우 : 이전 LCS에 현재 문자를 이어 붙임
    if str1[i] == str2[j]:
        count, seq = lcs(i - 1, j - 1)
        result = (count + 1, seq + [str1[i]])
        dp[i][j] = result
        return result
    else:
        # 두 경우 중 더 긴 LCS 선택
        left = lcs(i - 1, j)
        right = lcs(i, j - 1)
        if left[0] >= right[0]:
            dp[i][j] = left
            return left
        else:
            dp[i][j] = right
            return right

# 재귀 호출, 인덱스는 0-based이므로 최종 결과는 (n1-1, n2-1)
count, result_chars = lcs(n1 - 1, n2 - 1)

print(count)
print(''.join(result_chars))
