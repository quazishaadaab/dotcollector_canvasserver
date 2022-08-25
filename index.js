import sandbox from "./server.js"

import mongodb from "mongodb";
import dotenv from "dotenv";
import ControllerDAO from "./dao/controllerDAO.js"; //connects to restaurant API
import dotrouter  from "./api/route.js";

dotenv.config()

// initialize mongodb
const MongoClient = mongodb.MongoClient;
//initialize port specefied in .env file. server port is 8000

//set custmized properties for database
MongoClient.connect(
  //connects to database
  process.env.RESTREVIEWS_DB_URI, //links to the URI database link in mongodb
  {
    maxpoolSize: 50, //only allow 50 ppl at once to acess server/database
    wtimeoutMS: 2500, //quit afer 2500 milliseconds
    useNewUrlParser: true,
  } //parse the URL
)
  .catch((err) => {
    //catch any error if database connection goes wrong
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    // async client i dont know much about
    await ControllerDAO.injectDB(client); //    // before anything loads, we connect to the restaurants collection.
    await ControllerDAO.injectDB_Users(client); 
    
    //if promise is fufilled(connection succesful then we to the below)

    sandbox.listen(process.env.PORT || 2000, () => {
      console.log(`listening on port ${process.env.PORT} or 2000`); //prints which port is being used
    });
  });

