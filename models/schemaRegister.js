const Joi = require('joi');
const EMAIL_REGEX = require('../helpers/constants');

const schemaRegister = Joi.object({
    name: Joi.string()
        .min(2).required(),
    email: Joi.string()
        .pattern(EMAIL_REGEX)
        .required(),
        
    password: Joi.string().min(6).required()
});

module.exports = schemaRegister;