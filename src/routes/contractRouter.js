import { Router } from "express";

const creditOrderDto = {
    token: "",
    requester: "", //capturar do banco
    amount: "",
    orderId: "",
    bankId: "",
    status: false
  };
  

const contractRouter = Router()
contractRouter.post("/request-credit",  );

export default contractRouter