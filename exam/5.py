            
# Problem 5: Check if Two Strings are Anagrams - 5ქ
# Challenge:
#  Write a function to check if two strings are anagrams (contain the same characters in the same frequency).
# Instructions:
# Input: Two strings (e.g., "listen" and "silent").
# Output: A boolean (True or False) indicating if the strings are anagrams.
# Test Cases:
# assert are_anagrams("listen", "silent") == True
# assert are_anagrams("hello", "world") == False
# assert are_anagrams("triangle", "integral") == True

def main(a,b):
    _str = [i for i in a]
    _arr = [i for i in b]
    is_true = False
    for i in _str:
        if i in _arr:
            is_true = True
        else:
            is_true = False
            break
    return is_true
print(main("listen", "silent"))
print(main("hello", "world"))
print(main("triangle", "integral"))

