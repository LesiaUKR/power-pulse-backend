const { createError } = require("../helpers");
const Users = require("../models/users");

const getBMR = async (req, res, next) => {
        try {
            const data = await Users.findByIdAndUpdate(req.user, { bodyParams: { ...req.body } });  
            res.status(200);
            res.json({
                message: 'contact updated',
                status: 'Update',
                code: 200,
                // data: data.bodyParams
            })
            
        } catch (err) {
            next(createError('NOT_FOUND', err.message));
        }
    
}
module.exports = getBMR