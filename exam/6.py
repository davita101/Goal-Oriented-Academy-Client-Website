# Problem 6: Find Intersection of Two Lists - 5ქ
# Challenge:
#  Write a function to find the common elements between two lists.
# Instructions:
# Input: Two lists of integers (e.g., [1, 2, 3] and [2, 3, 4]).
# Output: A list of integers representing the intersection (e.g., [2, 3]).
# Test Cases:
# assert find_intersection([1, 2, 3], [2, 3, 4]) == [2, 3]
# assert find_intersection([1, 1, 2], [1, 3]) == [1]
# assert find_intersection([], [1, 2]) == []

def main(a,b):
    _str = [i for i in a]
    _arr = [i for i in b]
    _res = []
    for i in _str:
        if i in _arr:
            _res.append(i)
    return(list(set(_res)))
print(main([1, 2, 3], [2, 3, 4]))
print(main([1, 1, 2], [1, 3]))
print(main([], [1, 2]))