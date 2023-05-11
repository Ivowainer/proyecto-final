import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    email: { type: String, required: true },
    type: { type: String, enum: ["usuario", "sistema"], required: true },
    date: { type: Date, default: Date.now },
    body: { type: String, required: true },
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
