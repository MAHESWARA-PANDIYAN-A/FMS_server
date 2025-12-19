import mongoose from "mongoose";
import connectDb from "../DB/db.js";


const fmsSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    phone: { type: String, require: true },
    role: { type: String, default: "User" }
})



const fmsCollection = mongoose.model("users", fmsSchema)


export default fmsCollection;