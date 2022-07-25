import joi from "joi";

export const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().regex(/^([0-9]{10}|[0-9]{11})$/).required(),
    cpf: joi.string().regex(/^([0-9]{11})$/).required(),
    birthday: joi.date().iso().less('now').required(),

});

export const cpfSchema = joi.object({
    cpf: joi.string().regex(/^([0-9]{11})$/).required()
});

