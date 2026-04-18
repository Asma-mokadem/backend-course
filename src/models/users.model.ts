import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:String,
    age:Number,
    salary:Number,
    email:{
        type:String,
        required:true,
        unique:true
    },
    isMarried:Boolean
})
export const UserModel=mongoose.model("User",userSchema)