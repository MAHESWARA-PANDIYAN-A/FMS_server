import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const connectDb = () => {
    try{
        mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("there is a err");

    }
}

export default connectDb ;


