import express from 'express';
import { Signin, forgotPassword, resetPassword, signup } from '../controllers/user.js';


const router = express.Router();

router.post('/signin',Signin)
router.post('/signup',signup)
router.post('/forgot',forgotPassword)
router.post('/reset',resetPassword)

const userRouter=router
export{userRouter}