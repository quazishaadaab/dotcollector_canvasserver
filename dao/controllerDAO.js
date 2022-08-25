
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

static async injectDotInUser(userid,roomid,dot){
try {

  // javascript canot process back ticks in runtime, so we need to use brackets around it

dot.map(async array=>{

  await users.updateMany({userid:userid},
    {$push:{[ `dotCollection.${roomid}`]:array}})

})
}
catch(e){
  console.error(`Unable to post review: ${e}`);
  return { error: e };

}

}







static async getAllRooms() {


  let cursor = await rooms.find().toArray()
  return await cursor 

}







static async updateDotInUser(userid,roomid,dot){

  try {


await users.updateMany({userid:userid},
{$set:{[ `dotCollection.${roomid}`]:dot}})

}
catch(e){
console.error(`Unable to post review: ${e}`);
return { error: e };

}
// try {



//   await users.updateMany({userid:userid},
// {$push:{'dotCollection':'888'}})

// }
// catch(e){
//   console.error(`Unable to post review: ${e}`);
//   return { error: e };

// }

}











  static async getAvgDot(userid){

    try{
     const cursor= await users.find({'userid':userid}).toArray()
      return await (cursor[0])

    } catch(e){console.log(e)}
  }


  static async getDotCollectionCount(userid){

    try{
     const cursor= await users.find({userid:userid}).toArray()
     const t= cursor[0].dotCollection
     
      return await (t)

    } catch(e){console.log(e)}
  }













}
