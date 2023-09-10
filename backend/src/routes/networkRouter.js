import { Router } from "express";
import { getNetwork, postNetwork, removeNetwork } from "../controllers/networkController.js";
import { validationSchema } from "../middlewares/validationSchema.js";
import { networkSchema } from "../schemas/networkSchema.js";
import { validationAuth } from "../middlewares/validationAuth.js";

const networkRouter = Router()
networkRouter.post("/post-network", validationSchema(networkSchema), postNetwork);
networkRouter.get("/get-network", validationAuth, getNetwork);
networkRouter.delete("/delete-network/:networkId", validationAuth, removeNetwork);

export default networkRouter