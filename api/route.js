import express from "express"

import Controller from "./controller.js"

 const dotrouter = express.Router()



//port 5000
// rooms api

// getRoomById


dotrouter.route("/getDotCollectionCount").post(Controller.getDotCollectionCount)


dotrouter.route("/updateDotInUser").put(Controller.updateDotInUser)
dotrouter.route("/getAllRooms").get(Controller.getAllRooms)

dotrouter.route("/passNewGrid").get(Controller.passNewGrid)

// post ratings
dotrouter.route("/updateRatings").put(Controller.updateRatings)
dotrouter.route("/getRatings").post(Controller.getRatings)


// router.route("./postDotInUser").post(Controller.postDotInUser)
// router.route("./updateDot").update(Controller.updateDot)

// dashboard api + peer list api

export default dotrouter
