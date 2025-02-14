import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title required "],
    },
    description:{
        type:String,
        required:[true,"description required "],
    },
    timeline:{
        from: {
            type:Date,
            required:[true,"Timeline Starting Date is required "],
        },
        to : String,
    }
});


export const Timeline = mongoose.model("Timeline",timelineSchema)