import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
// signup create--------------------------------
export const signup =async (req,res,next)=>{
   const {username, email,password}=req.body;
  
   if(!username || !email || !password || username === '' || email=== '' || password===''){
      next(errorHandler(400,"All fields are required"));
   }

//    password hashing with bcrypt

  const hashedPassword = bcryptjs.hashSync(password,10)
   
   const newUser = new User({
    username,
    email,
    password:hashedPassword
   })


   try{

    await newUser.save();
    res.json( "signup successfulll")
   }catch(error){
    console.error("Error signup user--->:", error);
    next(error)
   }

}