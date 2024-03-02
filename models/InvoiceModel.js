import mongoose from "mongoose";

const InvoiceSchema=mongoose.Schema({
    date:Date,
    currency:String,
    items:[{itemName:String,unitPrice:String,quantity:String,discount:String}],
    rates:String,
    Gst:Number,
    total:Number,
    subTotal:Number,
    notes:String,
    status:String,
    invoiceNumber:String,
    type:String,
    creator:[String],
    totalAmountReceived:Number,
    client:{name:String,email:String,phone:String,address:String},
    paymentRecords:[{amountPaid:Number,datePaid:Date,paymentMethod:String,note:String, paidBy:String}],
    createdAt:{
        type:Date,
        default:new Date()
    }


})

const InvoiceModel =mongoose.model("InvoiceModel",InvoiceSchema)
export  {InvoiceModel}