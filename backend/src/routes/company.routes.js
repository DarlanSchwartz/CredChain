import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.js";
import { validationAuth } from "../middlewares/validationAuth.js";
import { companySchema } from "../schemas/companySchema.js";
import { getCompanies, registerCompany } from "../controllers/company.controller.js";

const companyRouter = Router()
companyRouter.post("/register-company",validationAuth, validationSchema(companySchema), registerCompany);
companyRouter.get("/companies",validationAuth, getCompanies);

export default companyRouter;