import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup =async (req,res)=>{
   const {username, email,password}=req.body;
  
   if(!username || !email || !password || username === '' || email=== '' || password===''){
       return res.status(400).json('All fields are required!')
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
     res.status(500).json({message: error.message})
   }

}