import mongoose from "mongoose";
import jwt from "jsonwebtoken";



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    resetToken:String,
    expireToken:Date,
})

const User=mongoose.model("User",userSchema);



export {User};