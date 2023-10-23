const createError = require("../helpers/createError");
const validate = (target)=>(schema, mess='')=>(req, res, next) => {
    const data = target === 'body' 
            ? req.body 
            : {contactId: req.params.contactId}; 
    const result = schema.validate(data);
    if (result.error){
        const newErr = createError('BAD_REQUEST');
        next({...newErr, message: mess || result.error.details[0].message});
    }
    else next();
}

module.exports = validate;