const { createError } = require("../helpers");
const Users = require("../models/users");

const getBMR = async (req, res, next) => {
    try {
            const updBodyParams = {bodyParams: { ...req.body }}
            const data = await Users.findByIdAndUpdate(req.user, { ...updBodyParams });  
            res.status(200);
            res.json({
                message: 'contact updated',
                status: 'Update',
                code: 200,
                data: updBodyParams
            })
            
        } catch (err) {
            next(createError('NOT_FOUND', err.message));
        }
    
}
module.exports = getBMR