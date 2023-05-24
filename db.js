const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.DATABASE.toString();


const mongoDB = async()=>{
   // mongoose.set('strictQuery', false);
  await mongoose.connect(mongoURI,{useNewUrlParser : true},async(err,result)=>{
   if(err){
      console.log(err);
   }
      console.log("connected");
      // fetching data
      // const fetched_data = await database.collection("food_items");
      const data1 = await mongoose.connection.db.collection("food_items")
        data1.find({}).toArray(async function(err,data){
           // global.food_items= data;
            // console.log(res);
            const foodCategory = await mongoose.connection.db.collection("foodCategory")
            foodCategory.find({}).toArray( function(err,catData){
                  if(err){
                     console.log(err);
                  }
                  else{
                     global.food_items= data;
                     global.foodCategory= catData;
                  }
            })
               

        });

   });
} 
module.exports=mongoDB;