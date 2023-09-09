import { Router } from "express";
import userRouter from "./userRouter.js";
import contractRouter from "./contractRouter.js";
import companyRouter from "./company.routes.js";

const router = Router();

router.use(userRouter);
router.use(contractRouter)
router.use(companyRouter);


export default router;