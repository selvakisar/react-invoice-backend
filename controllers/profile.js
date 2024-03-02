import mongoose from "mongoose";
import express from "express";

import {ProfileModel} from "../models/ProfileModel.js";

// const router=express.Router();

export const getProfiles=async (req, res) => {
    try {
        const allProfiles = await ProfileModel.find().sort({_id:-1})
        
        res.status(200).json(allProfiles)
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getProfile = async (req,res)=>{
    const {id}=req.params;

    try {
        const profile =await ProfileModel.findById(id)

        res.status(200).json(profile)
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createProfile = async (req,res)=>{
    const {name,email,phoneNumber,
    businessName,contactAddress,logo,website,userId}=req.body;

    const newProfile = new ProfileModel({name,
        email,
        phoneNumber,
        contactAddress,
        businessName,
        logo,
        website,
        userId,
        createdAt:new Date().toISOString()})
        try {
            const existingUser = await ProfileModel.findOne({email})
            if(!existingUser) 
            return res.status(404).json({message:"Profile already exists"})
            await newProfile.save();
            res.status(200).json(newProfile)
        } catch (error) {
            res.status(409).json({message:error.message})
        }
}

export const getProfileByUser=async (req,res)=>{
    const {searchQuery} = req.query;
    try {
        const profile = await ProfileModel.findOne({userId:searchQuery})

        res.json({data:profile})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}


export const getProfileBySearch=async (req,res)=>{
    const searchQuery = req.query;
    try {
        const name = new RegExp(searchQuery,"i")
        const email = new RegExp(searchQuery,"i")

        const profile = await ProfileModel.findOne({$or:[{name},{email}]})

        res.json({data:profile});
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const updateProfile =async (req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`no profile with id:${id}`)

    await ProfileModel.findByIdAndDelete(id)
}

export const deleteProfile=async (req,res)=>{
    const {id}=req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`no profile with id:${id}`)
    await ProfileModel.findByIdAndDelete(id)
}