import joi from 'joi';

export const companySchema = joi.object({
    cnpj: joi.string().required(),
    inscription: joi.string().trim().required(),
    socialReason: joi.string().trim().required(),
    fantasyName: joi.string().trim().required(),
    phone: joi.number().required()
});