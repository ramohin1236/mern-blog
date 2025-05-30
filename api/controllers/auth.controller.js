import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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

// signin -----------------------------------

export const signin =async(req,res,next)=>{
  const {email, password}= req.body;

  if(!email || !password || !email === ''|| !password===''){
     next(errorHandler(400, "All fields are required"))
  }

  try{
    // cheak valid user
    const validUser = await User.findOne({email})
    if(!validUser){
       return next(errorHandler(400, "User not found!"))
    }
// cheak password correct
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword){
      return  next(errorHandler(400, "Invalid password!"))
    }
// generate token
    const token = jwt.sign(
        { id: validUser._id,isAdmin : validUser.isAdmin},
        process.env.JWT_SECRET
    )
    // hide password when login
    const {password: pass, ...rest}= validUser._doc;
  res.status(200).cookie('access_token', token,{
    httpOnly:true}).json(rest);
    

  }catch(error){
    next(error)
  }
}

// google signin 

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {  
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign(
            { id: user._id,isAdmin : user.isAdmin},
             process.env.JWT_SECRET
        )
        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const token = jwt.sign(
            { id: user._id,isAdmin : newUser.isAdmin},
             process.env.JWT_SECRET
        )
        const { password, ...rest } = newUser._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };