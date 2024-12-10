
# Problem 8: Longest Consecutive Sequence - 8ქ
# Challenge:
#  Given an unsorted array of integers, find the length of the longest consecutive elements sequence.
# Instructions:
# Input: A list of integers (e.g., [100, 4, 200, 1, 3, 2]).
# Output: The length of the longest consecutive sequence (e.g., 4).
# Test Cases:
# assert longest_consecutive([100, 4, 200, 1, 3, 2]) == 4  # [1, 2, 3, 4]
# assert longest_consecutive([0, 0]) == 1
# assert longest_consecutive([9, 1, 4, 7, 3, 2, 8, 5, 6]) == 9


def main(arr):
    last_num = sorted(arr)[0]
    bro = []
    if last_num == sorted(arr)[0]:
        bro = [sorted(arr)[0]]
    for i in sorted(arr):
        if last_num+ 1 == i:
            bro.append(i)
            last_num = i  
    return len(bro)
print(main([100, 4, 200, 1, 3, 2]))
print(main([0,0]))
print(main([0,1,2,3,4]))
print(main([9, 1, 4, 7, 3, 2, 8, 5, 6]))