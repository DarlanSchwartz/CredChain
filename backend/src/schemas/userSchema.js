import baseJoi from 'joi';
import joiDate from "@joi/date";

const joi = baseJoi.extend(joiDate) 

export const signupSchema = joi.object({
  cpf: joi.string().length(11).pattern(/^[0-9]+$/).required(),
  name: joi.string().trim().required(),
  date: joi.date().format("DD-MM-YYYY").required(),
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
  });
  
  export const signinSchema = joi.object({
    cpf: joi.string().length(11).pattern(/^[0-9]+$/).required(),
    password: joi.string().trim().required()
  });