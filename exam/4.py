# Problem 4: Longest Substring Without Repeating Characters - 5ქ
# Challenge:
#  Create a function that finds the length of the longest substring without repeating characters.
# Instructions:
# Input: A string (e.g., "abcabcbb").
# Output: An integer representing the length of the longest substring (e.g., 3 for "abc").
# Test Cases:
# assert longest_unique_substring("abcabcbb") == 3
# assert longest_unique_substring("bbbbb") == 1
# assert longest_unique_substring("") == 0
# assert longest_unique_substring("pwwkew") == 3

def man(arr):
    long = 0
    _str = ''
    for char in arr:
        if char in _str:
            _str = _str[_str.index(char) + 1:]
        _str += char
        long = max(long, len(_str))
    return long
        
print(man("abcabcbb"))
print(man("bbbbb")) 
print(man(""))
print(man("pwwkeww")) 