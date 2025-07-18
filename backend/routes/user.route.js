import { Router } from "express";
import { addUser, claimPoints, getUsers } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get('/get',getUsers);
userRouter.post('/add',addUser);
userRouter.put('/claim',claimPoints);

export default userRouter;