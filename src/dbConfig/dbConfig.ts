import mongoose from 'mongoose';

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI !);
    const connection=mongoose.connection;

    connection.on('connected',()=>{
      console.log("MongoDb connected successfully");
    });
    connection.on('error',(err)=>{
      console.log("MongoDb connected error. Please make sure MongoDB is running. "+err);
      process.exit();
    })
    
  } catch (error) {
    console.log("Something goes wrong");
    console.log(error);
  }
}