const createError = require("../helpers/createError");
const Users = require("../models/users");

const current = async (req, res, next) => {
    const user = await Users.findOne({_id: req.user});
    if (!user) next(createError('UNAUTHORIZED', 'Not authorized'))
    else {
        delete user._doc.password;
        delete user._doc.createdAt;
        delete user._doc.updatedAt;

        res.status(200).json({
            message: 'OK, login success',
            ResponseBody: {
                ...user._doc 
            },
            
        })
    }
}
 
module.exports = current;