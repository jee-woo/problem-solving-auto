import math

def gcd(a, b):
    if b == 0: return a
    return gcd(b, a % b)

def solution(w,h):
    if w == h: return w*h - w

    return w*h - (w+h-gcd(w, h))

"""
최대 공약수 구하기...

"""