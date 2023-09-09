import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.js";
import { signup, logout, login, getUser } from "../controllers/userController.js";
import { signinSchema, signupSchema } from "../schemas/userSchema.js";
import { validationAuth } from "../middlewares/validationAuth.js";

const userRouter = Router()
userRouter.post("/signup", validationSchema(signupSchema), signup);
userRouter.post("/login", validationSchema(signinSchema), login);
userRouter.get("/user", validationAuth, getUser);
userRouter.delete('/logout', validationAuth, logout);

export default userRouter