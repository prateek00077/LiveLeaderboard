import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/user.route.js';
import connectDb from './config/db.js';

const PORT = process.env.PORT || 8000;

const app = express();
dotenv.config();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use('/api/user',userRouter);

// connecting the database
await connectDb();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})