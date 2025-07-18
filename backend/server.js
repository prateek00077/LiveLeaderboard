import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/user.route';
import connectDb from './config/db';

const PORT = process.env.PORT || 3000

const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/user',userRouter);

// connecting the database
await connectDb();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})