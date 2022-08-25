import express from "express"

import Controller from "./controller.js"

 const dotrouter = express.Router()



//port 5000
// rooms api

// getRoomById


dotrouter.route("/getAvgDot").post(Controller.getAvgDot)
dotrouter.route("/getDotCollectionCount").post(Controller.getDotCollectionCount)


dotrouter.route("/updateDotInUser").put(Controller.updateDotInUser)
// this is useless and the dot insertion is messed up.
dotrouter.route("/postDotInUser").put(Controller.postDotInUser)
dotrouter.route("/getAllRooms").get(Controller.getAllRooms)

// getdotcollection



// router.route("./postDotInUser").post(Controller.postDotInUser)
// router.route("./updateDot").update(Controller.updateDot)

// dashboard api + peer list api

export default dotrouter
