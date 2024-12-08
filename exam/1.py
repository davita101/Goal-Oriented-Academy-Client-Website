# Problem 1: Sum of Positive Numbers - 2ქ
# Challenge:
#  Create a function that takes a list of numbers and returns the sum of all positive numbers.
# Instructions:
# Input: A list of integers (e.g., [1, -4, 7, 12]).
# Output: The sum of all positive integers in the list.

# Test Cases:
# assert problem_1_sum_of_positive([1, -4, 7, 12]) == 20
# assert problem_1_sum_of_positive([-1, -2, -3, -4]) == 0
# assert problem_1_sum_of_positive([]) == 0

def bro(a):
    l = 0
    for i in a:
        if int(i) >=0:
            l += int(i)
    return l

print(bro([1, -4, 7, 12]))
print(bro([1, -4, 7, "12"]))
print(bro([1, -4, 7.5, "12"]))
print(bro([-1, -2, -3, -4]))
print(bro([-1, -2, -3, -4]))
print(bro([]))
                
