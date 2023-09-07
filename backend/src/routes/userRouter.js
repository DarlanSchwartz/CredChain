import { Router } from "express";
import { validationschema } from "../middlewares/validationSchema.js";
import { signup, signin } from "../controllers/userController.js";
import { signinSchema, signupSchema } from "../schemas/userSchema.js";

const userRouter = Router()
userRouter.get("/signup", signup);
userRouter.post("/signin", validationschema(signinSchema), signin);

export default userRouter