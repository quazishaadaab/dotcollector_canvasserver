


import requests
import sys 
import json
# from "dotCollectionTests" import calculateAvgDotPython
# from rooms.dotCollectionTests import dotCollectionTests

CANVAS_BACKEND="http://localhost:2000"
BASE_BACKEND = "http://localhost:8000"


userid='a7055ad8652c81b0ba9f79f0e7dce8d45648a6f1'

response=requests.post(BASE_BACKEND+"/getUserById",json={"userid":userid})
dic=response.json()

def cleanDot(dot):
    # this is the resulting final array. This is modified and copy this to prod
    final=[]
    for row in dot:
        
        column_array_values=[]
        for column in row :
            if column:
                column_array_values.append(int(column['value'])) #since the value is a string in the database, we convert it to an int
                # print(column)
            else:
                column_array_values.append(None)
        # print(column_array_values)
        final.append(column_array_values)
    return final




# NEED TO CREATE ATTRIBUTE LIST NEXT
attributes=set() #set
dotCollections = [

{
    "attribute_id":"456",
    "room_id":"1",
    "dot": [
            [{
                "color": "#f64a2b",
                "row": 1,
                "column": 1,
                "x": 0,
                "y": 0,
                "gap_h": 100,
                "gap_v": 100,
                "value": "1"
            }, None, {
                "color": "#f64a2b",
                "row": 1,
                "column": 3,
                "x": 200,
                "y": 0,
                "gap_h": 100,
                "gap_v": 100,
                "value": "3"
            }, {
                "color": "#f64a2b",
                "row": 1,
                "column": 4,
                "x": 300,
                "y": 0,
                "gap_h": 100,
                "gap_v": 100,
                "value": "4"
            }, None, None],
            [{
                "color": "#1c7220",
                "row": 2,
                "column": 1,
                "x": 0,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "5"
            }, None, {
                "color": "#1c7220",
                "row": 2,
                "column": 3,
                "x": 200,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "7"
            }, {
                "color": "#1c7220",
                "row": 2,
                "column": 4,
                "x": 300,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "8"
            }, None, None],
            [{
                "color": "#1c7220",
                "row": 3,
                "column": 1,
                "x": 0,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "9"
            }, {
                "color": "#1c7220",
                "row": 3,
                "column": 2,
                "x": 100,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "10"
            }, {
                "color": "#1c7220",
                "row": 3,
                "column": 3,
                "x": 200,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "1"
            }, {
                "color": "#1c7220",
                "row": 3,
                "column": 4,
                "x": 300,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "2"
            },None,None],
            [None, None, None, None, None, None],
            [None, None, None, None, None, None],
            [None, None, None, None, None, None],
            [None, None, None, None, None, None]
        ],
},
{
    "attribute_id":"123",
    "room_id":"3",
    "dot": [
            [{
                "color": "#f64a2b",
                "row": 1,
                "column": 1,
                "x": 0,
                "y": 0,
                "gap_h": 100,
                "gap_v": 100,
                "value": "18"
            }, {
                "color": "#f64a2b",
                "row": 1,
                "column": 2,
                "x": 100,
                "y": 0,
                "gap_h": 100,
                "gap_v": 100,
                "value": "2"
            }, {
                "color": "#f64a2b",
                "row": 1,
                "column": 3,
                "x": 200,
                "y": 0,
                "gap_h": 100,
                "gap_v": 100,
                "value": "3"
            }, {
                "color": "#f64a2b",
                "row": 1,
                "column": 4,
                "x": 300,
                "y": 0,
                "gap_h": 100,
                "gap_v": 100,
                "value": "4"
            }, None, None],
            [{
                "color": "#1c7220",
                "row": 2,
                "column": 1,
                "x": 0,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "5"
            }, {
                "color": "#1c7220",
                "row": 2,
                "column": 2,
                "x": 100,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "6"
            }, {
                "color": "#1c7220",
                "row": 2,
                "column": 3,
                "x": 200,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "7"
            }, {
                "color": "#1c7220",
                "row": 2,
                "column": 4,
                "x": 300,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "8"
            }, None, None],
            [{
                "color": "#1c7220",
                "row": 3,
                "column": 1,
                "x": 0,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "9"
            }, {
                "color": "#1c7220",
                "row": 3,
                "column": 2,
                "x": 100,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "10"
            }, {
                "color": "#1c7220",
                "row": 3,
                "column": 3,
                "x": 200,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "1"
            }, {
                "color": "#1c7220",
                "row": 3,
                "column": 4,
                "x": 300,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "2"
            },None,None],
            [None, None, None, None, None, None],
            [None, None, None, None, None, None],
            [None, None, None, None, None, None],
            [None, None, None, None, None, None]
        ],
   },
 {
    "attribute_id":"456",
    "room_id":"2",
    "dot": [
            [{
                "color": "#f64a2b",
                "row": 1,
                "column": 1,
                "x": 0,
                "y": 0,
                "gap_h": 100,
                "gap_v": 100,
                "value": "1"
            }, None, {
                "color": "#f64a2b",
                "row": 1,
                "column": 3,
                "x": 200,
                "y": 0,
                "gap_h": 100,
                "gap_v": 100,
                "value": "3"
            }, {
                "color": "#f64a2b",
                "row": 1,
                "column": 4,
                "x": 300,
                "y": 0,
                "gap_h": 100,
                "gap_v": 100,
                "value": "4"
            }, None, None],
            [{
                "color": "#1c7220",
                "row": 2,
                "column": 1,
                "x": 0,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "5"
            }, None, {
                "color": "#1c7220",
                "row": 2,
                "column": 3,
                "x": 200,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "7"
            }, {
                "color": "#1c7220",
                "row": 2,
                "column": 4,
                "x": 300,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "8"
            }, None, None],
            [{
                "color": "#1c7220",
                "row": 3,
                "column": 1,
                "x": 0,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "9"
            }, {
                "color": "#1c7220",
                "row": 3,
                "column": 2,
                "x": 100,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "10"
            }, {
                "color": "#1c7220",
                "row": 3,
                "column": 3,
                "x": 200,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "1"
            }, {
                "color": "#1c7220",
                "row": 3,
                "column": 4,
                "x": 300,
                "y": 100,
                "gap_h": 100,
                "gap_v": 100,
                "value": "2"
            },None,None],
            [None, None, None, None, None, None],
            [None, None, None, None, None, None],
            [None, None, None, None, None, None],
            [None, None, None, None, None, None]
        ],
   }

]


dotCollect=[]

# change to dic[dotCollection] in prod
for roomid in dotCollections:
    dot=cleanDot(roomid["dot"])
    print("lanaga",roomid["dot"])
    ent={"attribute_id":roomid['attribute_id'],"room_id":roomid['room_id'],"dot":dot} 
    dotCollect.append(ent)








attributes=['456']






dotCollection=dotCollect






# attri: 1 

# 9 6 7 3
# 4 3 6 2
# 1 1 1 5

# 9 6 7 3
# 4 3 6 2
# 1 1 1 5


#  TEST 1 : Add all similar attribute id content


averages=[]
# dotCollection?.map(async(dot)=>{

#     # //set is now populated with all unique attribute ids
#     await attributes.insert(dot?.attribute_id)  # attributes={1,2}

# })


for i in attributes :
    #create a new buffer for each attribute
    main_buffer=[]
    peers=7
    skills=6
    for entities in dotCollection:
        #for each attribute_id , we will create a single unique buffer that will house all the dots across all the rooms associated with that attribute
        buffer=[]
    
        #i is the attribute id which is constantly moving/changing, aggregating similar attribute_id dots
        if(entities["attribute_id"]==i):
            for dot_array in entities["dot"] :
                #this is wrong, change peers.although we never use it
                # peers= len(dot_array)
                print('d_array',dot_array)
                # skills= len(api_call(attribute_id).names)
                # skills=len(dot_array) #this is wrong,above is the only right way to do it 
                buffer.append(dot_array)
        else : 
            continue
        
    # //do buffer calculations here. below is first buffer
        print("buffer",buffer)
        for individual in buffer:
            for document in individual:
                main_buffer.append(document)
    
    # print(peers)
    # print(main_buffer)

    sum_of_skill=0
    #hops = peers * number of attribute ids. its how many times the pointer hops around the main_buffer
    hops=0 
    res=[]
    print('m.buffer',main_buffer)


#change 0,4 to 0, _num_of_skills

#traverse all rows
    for j in range(0,skills):
        # reset sum of specefic skill after use/when moving to next skill 
        sum_of_skill=0
        hops=0 #reset hop count(hops) everytime new skill is moved on/being calculated

        #aggregate every column.
        for k in range(j,len(main_buffer),skills): #0-17

            #if value exists in column, aggregate and increment hops
            if(main_buffer[k]): #if the horizontal row has an empty peer, then skip it and dont increment hops or add the value
                hops=hops+1
                print('hop count :',hops)
                sum_of_skill=main_buffer[k]+sum_of_skill
            else:  
                #if value is none/null/empty , then skip aggregation and dont increment hops
                continue

        #at the end, if column has a total sum of skill, then divide by hops count.   
        if(sum_of_skill):
            print('sums of skill',sum_of_skill)
            res.append(round(sum_of_skill/hops,2))
            print('result', round(sum_of_skill/hops,2))
        #if column has sum of skill of 0 at end, then it means it was an empty/Null total.Append null.
        else:
            res.append(None)

        print('total hops',hops)
        #append to resulting dot to export to database
        
            


    # Constructed a final array that contains the attribute id and its averages.
    resDoc={"attribute_id":i, "dot" :res}
    averages.append(resDoc)


    

output=averages
print(output)
#print({"rating_array":averages  , "userid":userid}) #this will send a stdout of the averages to controllerDAO.js to be uploaded into mongodb
#print('hello')
#requests.put(CANVAS_BACKEND+"/updateRatings",json={"rating_array":averages  , "userid":userid})
