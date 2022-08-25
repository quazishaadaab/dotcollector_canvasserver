import ControllerDAO from "../dao/controllerDAO.js";
class Controller {
  // constructor(realData){

  //     this.realData=realData || '';
  // }


static async getAvgDot(req,res,next){

  const userid =await req.body.userid

const userData =await ControllerDAO.getAvgDot(userid)
res.json({userData}?.userData?.avgDot)
}


static async getAllRooms(req, res, next) {
  const rooms = await ControllerDAO.getAllRooms();
  res.json(rooms);
  
}


static async getDotCollectionCount(req,res,next){

  const userid = await req.body.userid
  const count = await ControllerDAO.getDotCollectionCount(userid)
  res.json({count})
}




// users

static async postDotInUser(req, res, next) {
    const dot = await req.body.dot 
    const roomid=await req.body.roomid
    const userid=await req.body.userid

    res.json(req?.body)
    ControllerDAO.injectDotInUser(userid,roomid,dot)
  }


  static async updateDotInUser(req, res, next) {
    const dot = await req.body.dot 
    const roomid=await req.body.roomid
    const userid=await req.body.userid

    res.json(req?.body)
    ControllerDAO.updateDotInUser(userid,roomid,dot)
  }




  

}
export default Controller;
