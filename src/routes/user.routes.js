import { Router } from "express";
import { registerController } from "../controllers/user.register.js";
import { lognnController } from "../controllers/user.login .js";

export const userRouter = Router();

userRouter.post("/register", registerController);

userRouter.post("/login", lognnController);
