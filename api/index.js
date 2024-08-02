import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
const app =express();

dotenv.config({ path: '../.env' });

// mongoose is connected with server
mongoose
.connect(process.env.MONGODB_URL)
.then(
    ()=>{console.log("Monogdb is Connected")}
)
.catch(err=>{
    console.log("error connecting to-------->",err)
})


app.listen(3000,()=>{
    console.log("Server is runnig on port 3000!!");
});



