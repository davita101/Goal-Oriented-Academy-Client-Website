# Problem 3: Find the Missing Number - 2ქ
# Challenge:
#  Create a function to find the missing number in a list of integers from 1 to n.
# Instructions:
# Input: A list of integers from 1 to n with one number missing (e.g., [1, 2, 4, 5]).
# Output: The missing number (e.g., 3 in this case).
# Test Cases:
# assert find_missing_number([1, 2, 4, 5]) == 3
# assert find_missing_number([3, 5, 6, 1, 2]) == 4
# assert find_missing_number([2]) == []

def man(a):
    arr = []
    if (len(a) == 1 ):
        return []
    for i in range(1,max(a)+1):
        if i not in a:
            arr.append(i)
    return arr[0]
print(man([1, 2, 4, 5]))    
print(man([3, 5, 6, 1, 2]))    
print(man([2]))    