const Joi = require('joi');
const EMAIL_REGEX = require('../helpers/constants');

const schemaLogin = Joi.object({
    email: Joi.string()
        .pattern(EMAIL_REGEX)
        .required(),
    password: Joi.string().min(6).required()
});

module.exports = schemaLogin;