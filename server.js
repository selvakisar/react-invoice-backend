import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import bodyParser from "body-parser";

import nodemailer from "nodemailer";
import pdf from "html-pdf-node";
import { invoiceRouter } from "./routes/invoice.js";
import { profileRouter } from "./routes/profile.js";
import { clientRouter } from "./routes/clients.js";
import { userRouter } from "./routes/user.js";

import pdfTemplate from './documents/index.js'
import emailTemplate from './documents/email.js'
// import url from 'node:url';

// import fileUrlToPath from "url"
import { dirname } from "path";

// const fileUrlToPath = require('url')
// const dirname=require('dirname')


dotenv.config()
const app=express();
const {URL,PORT}=process.env



app.use((express.json({limit : "30mb",extended: true})));
app.use((express.urlencoded({limit:"30mb",extended:true})));
app.use((cors()));
// app.use(bodyParser())




//routes
app.use('/invoices',invoiceRouter )
app.use('/profile',profileRouter)
app.use('/client',clientRouter)
app.use('/user',userRouter)

// const transport =nodemailer.createTransport({
//     host:process.env.SMTP_PORT,
//     port:process.env.SMTP_HOST,
//     auth:{
//         user:process.env.Email_ID,
//         pass:process.env.Password
//     },
//     tls:{
//         rejectUnauthorized:false
//     }
// })

// const __filename =fileUrlToPath(import.meta.url)
// const __dirname = dirname(__filename)

// var options = {format:"A4"};

// app.post('/send-pdf',(req,res)=>{

//     const {email,company}=req.body;

//     pdf.create(pdfTemplate(req.boby),options).toFile('invoice.pdf',(err)=>{

//         transport.sendMail({
//             from:`process.env.Email_ID`,
//             to:`${email}`,
//             replyTo:`${company.email}`,
//             subject: `Invoice from ${company.businessName ? company.businessName : company.name}`, // Subject line
//             text: `Invoice from ${company.businessName ? company.businessName : company.name }`, // plain text body
//             html: emailTemplate(req.body), // html body
//             attachments:[{filename:'invoice.pdf',
//         path:`${__dirname}/invoice.pdf`}]
//         })
//     })
//     if(err){
//         res.send(Promise.reject())
//     }
//     res.send(Promise.resolve())


// })


// app.get('/',(req,res)=>{
//     res.send('server running ')
// })


mongoose.connect(URL)
.then(()=>console.log("connected successfully to database "))
.catch(()=>console.log("error connecting"));

app.listen(PORT,()=>console.log(`listening on port ${PORT}` ))


// mongoose.set('useFindAndModify',false);
// mongoose.set('useCreateIndex',true);
