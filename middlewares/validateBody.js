const {createError} = require('../helpers')
const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            next(createError('BAD_REQUEST', error.message));
        }
        next();
    };
    return func;
};

module.exports = validateBody;