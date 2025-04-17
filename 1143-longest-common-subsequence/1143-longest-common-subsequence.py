class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        answer = 0
        dp = [[None for _ in range(len(text2))] for _ in range(len(text1))]
        
        def lcs(s1, s2):
            if s1 < 0 or s2 < 0:
                return 0
            if dp[s1][s2] is not None:
                return dp[s1][s2]

            if text1[s1] == text2[s2]:
                c = lcs(s1-1, s2-1)
                dp[s1][s2] = c + 1
                return dp[s1][s2]
                
            l1 = lcs(s1, s2-1)
            l2 = lcs(s1-1, s2)

            dp[s1][s2] = max(l1, l2)

            return dp[s1][s2]
        
        lcs(len(text1)-1, len(text2)-1)
        answer = dp[len(text1)-1][len(text2)-1]

        return answer