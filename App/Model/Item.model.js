import mongoose from "mongoose";

let Schema = mongoose.Schema;

export const item  = new Schema({
    Name:{
        type:String,
        required:true
    },
    itemNumber:{
        type:String
    },
    price :{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    }

})

