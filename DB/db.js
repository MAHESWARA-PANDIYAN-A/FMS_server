import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const connectDb = async () => {
    try {
        // Try cloud MongoDB first
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");
    }
    catch (err) {
        console.error("Cloud MongoDB connection failed, trying local...");
        try {
            // Fallback to local MongoDB
            await mongoose.connect('mongodb://127.0.0.1:27017/BMP');
            console.log("Local database connected successfully");
        } catch (localErr) {
            console.error("Database connection error:", localErr);
            throw localErr;
        }
    }
}

export default connectDb;


