import mongoose from "mongoose";


const fmsSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: "User" }
})



const fmsCollection = mongoose.model("users", fmsSchema)


export default fmsCollection;