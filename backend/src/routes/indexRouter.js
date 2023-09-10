import { Router } from "express";
import userRouter from "./userRouter.js";
import contractRouter from "./contractRouter.js";
import companyRouter from "./company.routes.js";
import networkRouter from "./networkRouter.js";

const router = Router();

router.use(userRouter);
router.use(contractRouter);
router.use(companyRouter);
router.use(networkRouter);


export default router;