const Joi = require('joi');
const EMAIL_REGEX = require('../helpers/constants');

const schemaRegister = Joi.object({
    name: Joi.string()
        .min(2)
        .max(15)
        .required(),
    email: Joi.string()
        .pattern(EMAIL_REGEX)
        .required()
        .messages({
            'string.base': 'The email must be a string.',
            'any.required': 'The email field is required.',
            'string.empty': 'The email must not be empty.',
            'string.pattern.base': 'The email must be in format test@test.com.'
        }),
    password: Joi.string()
        .min(6)
        .required()
        
});

module.exports = schemaRegister;