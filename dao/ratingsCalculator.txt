import sys 
# from "dotCollectionTests" import calculateAvgDotPython
# from rooms.dotCollectionTests import dotCollectionTests
from calculateRatings import calculateAvgDotPython

# sys.argv is the array that contains all the input data being sent from javascript file
input = sys.argv[1] #accesses the first element of input array

print('hell')
# calculateAvgDotPython()

#pass in the user id ( no json object, just the number code)
# this will update the mongodb database with our most updated ratings
calculateAvgDotPython(input)

#print(input) #print is the system output, data to send out to javascript file
sys.stdout.flush() #useless



 