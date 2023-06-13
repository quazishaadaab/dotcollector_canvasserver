


import requests
import sys 
import json
# from "dotCollectionTests" import calculateAvgDotPython
# from rooms.dotCollectionTests import dotCollectionTests

# CANVAS_BACKEND="http://localhost:2000"
# BASE_BACKEND = "http://localhost:8001"

#CANVAS_BACKEND = https://backend-static-canvas.fly.dev
CANVAS_BACKEND="https://backend-static-canvas.fly.dev"

# BASE_BACKEND = "https://base-backend.fly.dev"

BASE_BACKEND = "https://base-backend.fly.dev"

def calculateAvgDotPython(userid):
    response=requests.post(BASE_BACKEND+"/getUserById",json={"userid":userid})
    dic=response.json()
    dotCollection=dic["dotCollection"]

    #this functiont takes in the json and filters for just the values in each row. It returns a 2-D array of arrays which include the values in each row.[[1,3,4,5],[2,None,5,None]]...etc
    def cleanDot(dot,attribute_id,roomid):
        # this is the resulting final array. This is modified and copy this to prod
        
        #create a 2-D resulting array for each unqiue attribute
        final=[]

        #Get the skills count for each attribute
        response=requests.post(BASE_BACKEND + "/getAttribute",json={"attributeid":attribute_id})
        skills=len(response.json()["attributes"])
        
        response2 = requests.post(BASE_BACKEND + "/getUsersInRoom", json = {"roomid":roomid})
        peers =  len(response2.json()["users"].keys())
 
        #For each row in dot
        for row in range(0,skills):
            
            #create a 1-D array to store the dots for a unique row
            column_array_values=[]
            #This helps parse the values to detect for empty gaps in dot. This is when the user doesnt input anything. We want the
            #gaps to be None

            #change below to for column in range(0,peers) to fix memory waste
            for column in range(0,peers): #skills is the fixed attribute array length, so if column doesnt exist in the row, we will get an exception saying index doesnt exist
                try : #if no exception, then append value to 1-D array
                    column_array_values.append(int(dot[str(row)][str(column)]['value'])) #since the value is a string in the database, we convert it to an int
                except: #if exception, meaning column index not in row, then append None
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
    for roomid in dotCollection:
        attribute_id=dotCollection[roomid]["attribute_id"]
        attributes.add(attribute_id) #add attribute_id to the set(unique attribute ids only added )
        
        dot=cleanDot(dotCollection[roomid]["dot"],attribute_id,roomid)
    
        ent={"attribute_id":attribute_id,"room_id":roomid,"dot":dot} 

        dotCollect.append(ent)



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
        # peers=7
        response=requests.post(BASE_BACKEND + "/getAttribute",json={"attributeid":i})
        skills=len(response.json()["attributes"])
  
        for entities in dotCollect:
            #for each attribute_id , we will create a single unique buffer that will house all the dots across all the rooms associated with that attribute
            buffer=[]
        
            #i is the attribute id which is constantly moving/changing, aggregating similar attribute_id dots
            if(entities["attribute_id"]==i):
                for dot_array in entities["dot"] :
                    #this is wrong, change peers.although we never use it
                    # peers= len(dot_array)
                    # print('d_array',dot_array)
                    # skills= len(api_call(attribute_id).names)
                    # skills=len(dot_array) #this is wrong,above is the only right way to do it 
                    buffer.append(dot_array)
            else : 
                continue
            
        # //do buffer calculations here. below is first buffer
            # print("buffer",buffer)
            # for individual in buffer:
            #     for document in individual:
            #         main_buffer.append(document)
            # for individual in buffer:
            #     for document in individual:
            #         main_buffer.append(document)
            for t in range(0,len(buffer[0])):
                for u in range(0,skills):
                    main_buffer.append(buffer[u][t])

        res=[]    
        for row in range(0,skills):
            total=[]
            register=[]
            for col in range(row,len(main_buffer),skills):
                register.append(main_buffer[col])

                #clean register for null values
                if None in register:
                    for p in range(0,len(register)):
                        if(register[p]==None):
                           del register[p]
          
            if(register):
                # Sum values in register 
                total=sum(register)/len(register)
                # Round answer to two decimal places
                res.append(round(total,2))
            else : #If register is empty ( meaning all None values for a skill) then put n/a as its rating
                res.append("n/a")
 

        # print(peers)
        # print(main_buffer)

        # sum_of_skill=0
        # #hops = peers * number of attribute ids. its how many times the pointer hops around the main_buffer
        # hops=0 
        # res=[]


    #change 0,4 to 0, _num_of_skills

    #traverse all rows
        # roomRes=[]

        
        
        # skillsTotal=0
        # hops=0
        # for i in range(0,len(main_buffer),peers*skills):
        #     buffer=[]
        #     for count in range(1,peers):

        #         if(main_buffer[i]):
        #             buffer.append(main_buffer[i])
        #         elif(main_buffer[i+count]):
        #             skillsTotal= main_buffer[i] + main_buffer[i+count]





        # for i in range(0,len(main_buffer),peers):
        #     accumulate = main_buffer[i]
        #     hops=1
        #     for increment in range(1,peers):
        #         if(accumulate==None):
        #             accumulate=main_buffer[i+increment]

        #         elif(main_buffer[i+increment]  ):
        #             hops=hops+1
        #             accumulate=accumulate+main_buffer[i+increment]
        #         else:
        #             continue
        #     if(accumulate):
        #         roomRes.append(round(accumulate,2))

        
        # #process roomRes
        # for k in range(0,skills):
        #     total=0
        #     for j in range(k,len(roomRes),skills):
        #         total=roomRes[j]+total
        #     res.append(total)



        # for j in range(0,skills):
        #     # reset sum of specefic skill after use/when moving to next skill 
        #     sum_of_skill=0
        #     hops=0 #reset hop count(hops) everytime new skill is moved on/being calculated

        #     #aggregate every column.
        #     for k in range(j,len(main_buffer),skills): #0-17

        #         #if value exists in column, aggregate and increment hops
        #         if(main_buffer[k]): #if the horizontal row has an empty peer, then skip it and dont increment hops or add the value
        #             hops=hops+1
        #             sum_of_skill=main_buffer[k]+sum_of_skill
        #         else:  
        #             #if value is none/null/empty , then skip aggregation and dont increment hops
        #             continue

        #     #at the end, if column has a total sum of skill, then divide by hops count.   
        #     if(sum_of_skill):
        #         res.append(round(sum_of_skill/hops,2))
        #     #if column has sum of skill of 0 at end, then it means it was an empty/Null total.Append null.
        #     else:
        #         res.append(None)

        #     print('total hops',hops)
        #     #append to resulting dot to export to database
            
                


        # Constructed a final array that contains the attribute id and its averages.
        resDoc={"attribute_id":i, "dot" :res}
        averages.append(resDoc)


        

    output=averages
    # print(output)
    return output
    #print({"rating_array":averages  , "userid":userid}) #this will send a stdout of the averages to controllerDAO.js to be uploaded into mongodb
    #print('hello')
    #requests.put(CANVAS_BACKEND+"/updateRatings",json={"rating_array":averages  , "userid":userid})

 
# sys.argv is the array that contains all the input data being sent from javascript file
input = sys.argv[1] #accesses the first element of input array
# input='4508120e34422c379fd932b69ba856718bec01cc'
print(json.dumps(calculateAvgDotPython(input)))



    