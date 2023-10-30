const Joi = require('joi');
const EMAIL_REGEX = require('../helpers/constants');

const schemaLogin = Joi.object({
    email: Joi.string()
        .pattern(EMAIL_REGEX)
        .required()
        .messages({
            'string.base': 'The email must be a string.',
            'any.required': 'The email field is required.',
            'string.empty': 'The email must not be empty.',
            'string.pattern.base': 'The email must be in format test@gmail.com.'
        }),
    password: Joi.string()
        .min(6)
        .required()
});

module.exports = schemaLogin;