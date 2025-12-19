import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    requestNo: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    customer: { type: String, required: true },
    amount: { type: Number, required: true },
    plan: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, default: "Pending" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
}, { timestamps: true });

const RequestCollection = mongoose.model("requests", requestSchema);

export default RequestCollection;