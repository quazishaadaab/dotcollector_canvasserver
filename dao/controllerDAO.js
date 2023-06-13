


import { createRequire } from "module";
const require = createRequire(import.meta.url);
const spawners = require('child_process').spawn;



let rooms;
let users;
let room_id;
let room_name;
let gridId;
let grid;


export default class ControllerDAO {
  static async injectDB(conn) {
    if (rooms) {
      return;
    }
    try {
      rooms = await conn.db(process.env.RESTREVIEWS_NS).collection("rooms");

    } catch (e) {
      console.error(`unable to establish a collection ${e}`);
    }
    
  }


  static async injectDB_Users(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.RESTREVIEWS_NS).collection("users");

    } catch (e) {
      console.error(`unable to establish a collection ${e}`);
    }
    
  }

// static async injectDotInUser(userid,roomid,dot){
// try {

//   // javascript canot process back ticks in runtime, so we need to use brackets around it

// dot.map(async array=>{

//   await users.updateMany({userid:userid},
//     {$push:{[ `dotCollection.${roomid}`]:array}})

// })
// }
// catch(e){
//   console.error(`Unable to post review: ${e}`);
//   return { error: e };

// }

// }







static async getAllRooms() {


  let cursor = await rooms.find().toArray()
  return await cursor 

}



static async updateRatings(userid){

try{

let out=''
  const data_to_pass_in = await userid;

  //SEND
  //this is input data being passed to python 
  const python_process = spawners('python3', [`${process.cwd()}/dao/calculateRatings_preprod-v2.py`, data_to_pass_in])

  //RECEIVE
  //this is the data being received from python output.
  python_process.stdout.on('data', (data) => {

    let buffer= JSON.parse(data.toString())
    users.updateMany({userid:userid},{$set:{'ratings': buffer}})
        
  })

}
catch(e){
  console.log(e)
}


}










static async updateDotInUser(userid,roomid,dot,attribute_id){
  try {
    // javascript canot process back ticks in runtime, so we need to use brackets around it

    const dotCollectionDoc = {"attribute_id":attribute_id,"room_id":roomid,"dot":dot}
    await users.updateMany(
      { userid: userid },
      { $set: { [`dotCollection.${roomid}`]: dotCollectionDoc } },
      {upsert:true}
    );
    console.log(dotCollectionDoc)

    // dot.map(async (array) => {
    //   await users.updateMany(
    //     { userid: userid },
    //     { $push: { [`dotCollection.${roomid}`]: array } }
    //   );
    // });
  } catch (e) {
    console.error(`Unable to post review: ${e}`);
    return { error: e };
  }
  
//   try {


// await users.updateMany({userid:userid},
// {$set:{[ `dotCollection.${roomid}`]:dot}})

// }
// catch(e){
// console.error(`Unable to post review: ${e}`);
// return { error: e };

// }
// try {



//   await users.updateMany({userid:userid},
// {$push:{'dotCollection':'888'}})

// }
// catch(e){
//   console.error(`Unable to post review: ${e}`);
//   return { error: e };

// }

}











  static async getRatings(userid){

    try{
     const cursor= await users.find({'userid':userid }).toArray()
      return await (cursor[0])

    } catch(e){

    }
  }


  static async getDotCollectionCount(userid){

    try{
     const cursor= await users.find({userid:userid}).toArray()
     const t= cursor[0].dotCollection
     
      return await (t)

    } catch(e){}
  }













}
