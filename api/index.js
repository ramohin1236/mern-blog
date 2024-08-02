import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.route.js';
import AuthRoutes from './routes/auth.route.js';

dotenv.config({ path: '../.env' });
console.log(process.env.MONGODB_URL);
// mongoose is connected with server
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const app =express();
app.use(express.json());

app.listen(3000,()=>{
    console.log("Server is runnig on port 3000!!");
});

app.use('/api/user',UserRoutes )
app.use('/api/auth',AuthRoutes )



