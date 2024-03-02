import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import http from "http";

dotenv.config();

const Key =process.env.KEY
//const PORT = process.env.PORT
const PORT=process.env.SMTP_PORT
const HOST=process.env.SMTP_HOST
const Email=process.env.Email_ID
const Pass=process.env.Password


import {User} from "../models/userModel.js";

import { ProfileModel } from "../models/ProfileModel.js";

export const Signin = async (req,res)=>{
    const {email,password}=req.body;
    try {
        const existingUser= await User.findOne({email})

        const userProfile= await ProfileModel.findOne({userId:existingUser?._id});

        if(!existingUser) return res.status(404).json({message:"user does not exist"})

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)

        if(!isPasswordCorrect) return res.status(404).json({message:"invalid credentials"})


        const token =jwt.sign({email:existingUser.email,id:existingUser._id},Key,{expiresIn:"1h"})

        res.status(200).json({result:existingUser,userProfile,token})
    } catch (error) {
        res.status(500).json({message:"oops! somthing went wrong"})
    }
}



export const signup=async (req,res)=>{
    const {email,password,confirmPassword,firstName,
    lastName,bio} = req.body;

    try {
        const existingUser= await User.findOne({ email})

        const userProfile= await ProfileModel.findOne({userId:existingUser?._id})

        if(existingUser) return res.status(400).json({message:"user already exists"})
        
        if(password!==confirmPassword) return res.status(404).json({message:"password does not match"})

        const hashedPassword = await bcrypt.hash(password,12)

        const result = await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`,bio})
        
        const token =jwt.sign({email:result.email,id:result._id},Key,{expiresIn:"1h"})

        res.status(200).json({result,userProfile,token})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
} 




export const forgotPassword =  (req,res)=>{
    const {email}= req.body;

    const transporter = nodemailer.createTransport({
        host:HOST,
        port:PORT,
        auth:{
            user:Email,
            pass:Pass
        },
        tls:{rejectUnauthorized:false}
    })



    crypto.randomBytes(32,(err,buffer)=>{
        if (err){
            console.log(err)
        }
        const token =buffer.toString('hex')
        User.findOne({email:email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User does not exist in our database"})
            }
            user.resetToken=token
            user.expireToken=Date.now()+3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:Email,
                    subject:"Password reset request",
                    html:
                    `
                    <p>You requested for password reset from  Invoicing application</p>
                    <h5>Please click this <a href="https://accountill.com/reset/${token}">link</a> to reset your password</h5>
                    <p>Link not clickable?, copy and paste the following url in your address bar.</p>
                    <p>https://accountill.com/reset/${token}</p>
                    <P>If this was a mistake, just ignore this email and nothing will happen.</P>
                    `
                })
                res.json({message:"check your email"})
            }).catch((err)=>console.log(err))
        })
    })
}



export const resetPassword = (req, res) => {
    const newPassword=req.body.password
    const sentToken = req.body.token

    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(403).json({error:"try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedPassword=>{
            user.password=hashedPassword
            user.resetToken=undefined
            user.expireToken=undefined
            user.save().then((saveduser)=>{
                res.json({message:"password updated success"})
            })
        })
    }).catch(err=>{
        console.log(err)
    });
}