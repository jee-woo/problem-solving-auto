#include <iostream>
#include <map>

using namespace std;

typedef long long ll;

int n, m, k;
ll arr[1000001], dp[1000001];
map<int, ll> mapp;

int main() {

    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> n >> m >> k;

    for (int i = 1; i <= n; ++i) {
        cin >> arr[i];
        dp[i] += dp[i - 1] + arr[i];
    }

    int cnt = m + k;
    int a, b;
    ll c;
    while (cnt--) {
        cin >> a >> b >> c;

        if (a == 1) {
            // 바꾸기
            if (mapp.find(b) != mapp.end()) mapp[b] = c - arr[b];
            else {
                pair<int, ll> temp = make_pair(b, c - arr[b]);
                mapp.insert(temp);
            }
        }
        else {
            // 구간합 출력
            ll sum = 0;
            for (auto iter = mapp.begin() ; iter != mapp.end(); iter++) {
                int key = iter->first;
                ll value = iter->second;

                if (key > c) break;
                if (key >= b) sum += value;
            }

            ll result = dp[c] - dp[b - 1] + sum;
            cout << result << '\n';
        }
    }

    return 0;
}
