#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, K;
    cin >> N >> K;

    vector<int> nums(N);
    for (int i = 0; i < N; ++i) {
        cin >> nums[i];
    }

    // DP 배열 초기화
    vector<int> dp(K + 1, 0);
    dp[0] = 1; // 합이 0을 만드는 방법은 1가지 (아무것도 선택하지 않는 경우)

    // DP 계산
    for (int i = 0; i < N; ++i) {
        for (int j = nums[i]; j <= K; ++j) {
            dp[j] += dp[j - nums[i]];
        }
    }

    // 결과 출력
    cout << dp[K] << "\n";

    return 0;
}
