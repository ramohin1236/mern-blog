import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.route.js';
import AuthRoutes from './routes/auth.route.js';
import PostRoutes from './routes/post.route.js';
import CommentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://new-blog-app.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use('/api/user', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/post', PostRoutes);
app.use('/api/comment', CommentRoutes);

// ✅ Serve frontend (React build)
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// ✅ Global error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

// ✅ Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});
