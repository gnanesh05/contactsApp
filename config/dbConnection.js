import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`connected to db - ${connect.connection.name}`)
    } 
    catch (error) { 
        console.log(error);
    }
}

export default connectDb;