import joi from 'joi';

export const networkSchema = joi.object({
    name: joi.string().required().trim(),
    image: joi.string().required().trim(),
    chainId: joi.string().required().trim(),
});