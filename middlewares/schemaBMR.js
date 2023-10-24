const Joi = require("joi");

const schemaBMR = Joi.object({
    height: Joi.number().min(150).required(),
    currentWeight: Joi.number().min(35).required(),
    desiredWeight: Joi.number().min(35).required(),
    birthday: Joi.date().less('now').custom((value, helpers) => {
        const age = (new Date() - value) / (1000 * 60 * 60 * 24 * 365.25);
        if (age < 18) {
            return helpers.error('The person must be at least 18 years old.');
        }
        return value;
    }).required(),
    blood: Joi.number().valid(1, 2, 3, 4).required(),
    sex: Joi.string().valid("male", "female").required(),
    levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required()
})

module.exports = schemaBMR;

// .iso().format('YYYY-MM-DD')