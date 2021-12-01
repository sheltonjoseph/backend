import express from "express";
import {MongoClient} from "mongodb"
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();



app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 5000;
 



//   const MONGO_URL = "mongodb://localhost";
  const MONGO_URL = process.env.MONGO_URL;
  
  async function createConnection() {
      const client = new MongoClient(MONGO_URL);
      await client.connect();
      console.log("Mongo db connected")
      return client;
  }

  createConnection();

  app.post('/pizzalist',async(request, response) => {
     const client = await createConnection();
    const data = request.body;
    const result = await client
    .db("pizzaDB")
    .collection("pizzalist")
    .insertMany(data);
    response.send(result);
  })

  app.get('/pizzalist',async(request, response) => {
    const client = await createConnection();
   const result = await client
   .db("pizzaDB")
   .collection("pizzalist")
   .find()
   .toArray()
   response.send(result);
 })




app.get("/",(request, response) => {
    response.send("pizza app")
})




app.listen(PORT,()=>console.log("the server is started in " , PORT));