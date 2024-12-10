# Problem 7: 3Sum Problem - 8ქ
# Challenge:
#  Find all unique triplets in an array that sum up to zero.
# Instructions:
# Input: A list of integers (e.g., [-1, 0, 1, 2, -1, -4]).
# Output: A list of unique triplets that sum to zero.
# Test Cases:
# assert three_sum([-1, 0, 1, 2, -1, -4]) == [[-1, -1, 2], [-1, 0, 1]]
# assert three_sum([0, 0, 0]) == [[0, 0, 0]]
# assert three_sum([1, 2, -2, -1]) == []


def main(arr):
    bro = []
    for i in arr:
        for j in arr:
            for k in arr:
                if sum([i,j,k]) == 0:
                    bro.append([i,j,k])
                    break
    return bro
    
# print(main([-1, 0, 1, 2, -1, -4]))
# print(main([0, 0, 0]))
# print(main([1, 2, -2, -1]))