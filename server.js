import express from "express";
import cors from "cors";
import path from "path";

import dotrouter from "./api/route.js";
import axios from "axios";
import mongodb from "mongodb";
import dotenv from "dotenv";
import ControllerDAO from "./dao/controllerDAO.js"; //connects to restaurant API
// import sandbox from "./canvasserver.js"


let ports = 2000;
// dotenv.config()

const sandbox = express();
sandbox.use(cors());

sandbox.use(express.json());
sandbox.use("/", dotrouter);




const __dirname = path.resolve();
//  console.log(__dirname);
// const id = Controller.data;

// var id= Controller.giveData()'
// const BASE_URL =  "http://localhost:2000";

const BASE_URL =  "https://backend-static-canvas.fly.dev";
// const BASE_URL =  "https://backend-static-canvas.fly.dev";


// https://base-backend.fly.dev
// "https://salty-tor-00815.herokuapp.com"
// "http://localhost:5000";
// const retriveArray()=>{

//   return data 

// }

// setIdArray(['123'])


function setIdArray(data) {
  // console.log(data)
  roomid_array = data
}
let roomid_array

var buffer = []

//Creates sandboxes for each room in database
async function getRooms(response, res, req) {


  // to wait for all the data to collect in one array

  let result = await response?.data;

  //to only map once there is a result variable with all data fields collected
  result?.map((r) => {
    buffer?.push(r?.roomid)
    setIdArray(buffer)

  //need to learn the inner workings of node use function and static file functionality. What is the memory usage ? 
  //Is it storing or overriding if called twice ?
    async function createSandboxElement(id) {
      return sandbox.use(`/rooms/${id}`, express.static(__dirname + "/src"));
    };

 createSandboxElement(r?.roomid);

    // tempid=await buffer2
    // console.log('buffer2:'+buffer2 + " tempid: "+tempid)
  });
  //  console.log(buffer)


  // console.log( "tempid1: "+tempid)
};


//Executes the creation of sandboxes
try {
  // need to put await here due to it being a promise. if we dont , the result array will not be filled
  sandbox.get("/launch", async (req, res) => {

console.log("***Launching***")
    await axios.get(`${BASE_URL}/getAllRooms`).then(response => {
      getRooms(response) //creates sandboxes
      res.json(response?.data)

    })

  })
} catch (error) {
  console.log(error)
}

// setInterval(function () {sandbox.use(`/rooms/7fa6732a-0eef-4ecb-932d-880b2dab0eaa`, express.static(__dirname + "/src"));}, 1000);


// id.push(room_id_data)



// console.log('---ENTERING ID ----')

// console.log('ID :'+ roomid_array)


// data.map((response)=>{
// console.log(response.roomid)
// id.append(response.roomid)

// })
// const id=['df87dad5-05ea-4adb-9f9f-178111e920f3','b7c1dd1f-69a0-4469-90c6-8fa241ccec76']

// axios.post(`${BASE_URL}/getRoomId`)

// console.log(`fuck em how ${id}`);

// sandbox.use(`/rooms/df87dad5-05ea-4adb-9f9f-178111e920f3`,express.static(__dirname + '/src'))
// sandbox.use(`/rooms/b7c1dd1f-69a0-4469-90c6-8fa241ccec76`,express.static(__dirname + '/src'))







// http://http://localhost:1337/rooms/${roomId}/home.html

// initialize mongodb

// index.js connects our reviews/restaurants API from the DAO files.

// app.listen(1337,function(){
//     console.log('Listening at port 1337');
// });




export default sandbox
