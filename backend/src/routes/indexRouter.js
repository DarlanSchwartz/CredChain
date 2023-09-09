import { Router } from "express";
import userRouter from "./userRouter.js";
import contractRouter from "./contractRouter.js";

const router = Router();

router.use(userRouter);
router.use(contractRouter)


export default router;