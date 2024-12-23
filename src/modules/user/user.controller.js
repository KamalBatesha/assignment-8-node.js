import { Router } from "express";
import { getUserByEmail, getUserById, signup ,update} from "./user.service.js";


export const userRouter=new Router();
userRouter.post("/signup",signup)
userRouter.put("/:id",update)
userRouter.get("/by-email",getUserByEmail)
userRouter.get("/:id",getUserById)
