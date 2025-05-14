function solution(m, n, puddles) {
    const MOD = 1_000_000_007;
    const dp = Array.from({ length: n }, () => Array(m).fill(0));
    
    const puddleSet = new Set();
    puddles.forEach(([x, y]) => {
        puddleSet.add(`${y-1}_${x-1}`)
    });
    puddleSet.add(`0_0`);
    
    dp[0][0] = 1;
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            // 시작 위치이거나 웅덩이면 건너뜀
            if (puddleSet.has(`${i}_${j}`)) continue;
            
            // 위에서 오는 경로
            if (i > 0) {
                dp[i][j] += dp[i - 1][j];
            }
            
            // 왼쪽에서 오는 경로
            if (j > 0) {
                dp[i][j] += dp[i][j - 1];
            }
            
            dp[i][j] %= MOD;
        }
    }
    
    return dp[n - 1][m - 1];
}