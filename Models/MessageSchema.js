import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    senderName:{
        type:String,
        minLength:[2,"Name Must Contain at least 2 characters"],
    },
    subject:{
        type:String,
        minLength:[2,"Subject Must Contain at least 2 characters"],
    },
    message:{
        type:String,
        minLength:[5,"Message Must Contain at least 5 characters"],
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
});


export const Message = mongoose.model("message",messagesSchema)