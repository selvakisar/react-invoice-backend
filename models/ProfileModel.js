import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    name:String,
    email:{type:String,required:true,unique:true},
    PhoneNumber:String,
    businessName:String,
    contactAddress:String,
    paymentDetails: String,
    logo:String,
    website: String,
    userId:[String],
})

const ProfileModel=mongoose.model('ProfileModel',profileSchema);
export  {ProfileModel};