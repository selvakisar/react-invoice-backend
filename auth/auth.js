import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const KEY=process.env.KEY;

const auth = async (req, res, next) => {
    try {
   
      const token=req.headers.authorization.split("")[1]

      const isCustomAuth=token.length<200

      let decodeData;
      if(token && isCustomAuth){ 
         decodeData=jwt.verify(token,KEY)

         req.userId=decodeData?.id
      }else {
         decodeData=jwt.decode(token)
         req.userId=decodeData?.sub
      }

      next()
      //    req.user=await 
    } catch (error) {
      console.log(error)
    }
   
}

export {auth}