function solution(n, tops) {
    const MOD = 10007;
    /*
    윗변이 n(0~n-1), 아랫변이 n+1(0~n)인 사다리꼴 
    사다리꼴 위의 정삼각형 tops (정삼각형이 있으면 1, 없으면 0)

    마름모 타일을 돌려서 3가지 형태로 사용 가능.
    dp[2n]
    */
    const dp = new Array(2 * n + 1).fill(0);
    dp[0] = 1;
    dp[1] = tops[0] ? 3 : 2;
    
    for (let i = 2; i <= 2 * n; i++) {
        // tops가 있는 i는 홀수
        if (i % 2 === 1) {
            // i가 홀수이고, tops가 있으면
            if (tops[Math.floor(i / 2)]) {
                dp[i] = (dp[i - 1] * 2 + dp[i - 2]) % MOD; // ?
                // dp[i] = (dp[i - 1] * 2 + 2) % MOD; // ?
            } else {
                // tops가 없으면
                dp[i] = (dp[i - 2] + dp[i - 1]) % MOD; // O
            }
        } else {
            // i가 짝수이면
            dp[i] = (dp[i - 2] + dp[i - 1]) % MOD; // O
        }
    }
    // console.table(dp)
    return dp[2 * n] % MOD;
}