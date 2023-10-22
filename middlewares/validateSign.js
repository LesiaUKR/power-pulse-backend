const createError = require("../helpers/createError");

const validateSign = (target) => (schema) => (req, res, next) => {
    const data = req.body;

    const result = schema.validate(data);
    if (result.error){
        const newErr = createError('BAD_REQUEST');
        next({...newErr, message: result.error.details[0].message});
    }
    else next();
}

module.exports = validateSign;