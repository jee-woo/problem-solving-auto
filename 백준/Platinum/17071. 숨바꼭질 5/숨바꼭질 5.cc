#include<bits/stdc++.h>
using namespace std;
typedef unsigned long long ull;

int n,k,mov=1;
int ans = -1;
queue<int> q;
bool visited[2][500001];

void bfs(){
    while (!q.empty()) {
        k += mov;

        if(k> 500000) {
            ans = -1;
            return;
        }

        if (visited[mov % 2][k]) {
            ans = mov;
            return;
        }
        int siz = q.size();
        for (int i = 0; i < siz; i++) {
            int x = q.front();
            q.pop();

            for (int nx : {x - 1, x + 1, 2 * x}) {
                if (nx == k) {
                    ans = mov;
                    return;
                }
                if (nx < 0 || nx>500000) continue;
                if (visited[mov % 2][nx]) continue;
                visited[mov % 2][nx] = true;
                q.push(nx);
            }
        }
        mov++;
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> n >> k;
    if (n == k) {
        cout << 0;
        return 0;
    }
    q.push(n);
    bfs();

    cout << ans;
    return 0;
}