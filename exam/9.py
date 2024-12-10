# Problem 9: Identify Non-Prime Numbers Within a Range
#  Objective:
#  Create a function that accepts two integers, start and end, and returns a list of all non-prime numbers within the range [start, end] (inclusive). A non-prime number is defined as any integer greater than 1 that is not a prime number.
# Example Test Cases:
# Input: start = 10, end = 20
#  Output: [10, 12, 14, 15, 16, 18, 20]
# Input: start = 1, end = 10
#  Output: [1, 4, 6, 8, 9, 10]
# Input: start = 20, end = 30
#  Output: [20, 21, 22, 24, 25, 26, 27, 28, 30]
# Input: start = 24, end = 25
#  Output: [24, 25]
# Input: start = 1, end = 1
#  Output: [1]

def prime(num):
    if num == 1:
        return False
    for i in range(2, num):
        if num % i == 0:
            return False
    return True

def main(start ,end):
    res = []
    for i in range(start, end + 1):
        if not prime(i):
            res.append(i)
    # if len(res) == 0:
    #     return [1]
    return res

print(main(10, 20))
print(main(1,10))
print(main(20,30))
print(main(10,20))
print(main(20,30))
