const createError = require("../helpers/createError");
const Users = require("../models/users");

const current = async (req, res, next) => {
    const user = await Users.findOne({_id: req.user});
    if (!user) next(createError('UNAUTHORIZED', 'Not authorized'))
    else res.status(200).json({
         message: 'OK, login success',
         ResponseBody: {
            email: user.email,
            subscription: user.subscription
         },
         token: user.token
    })
}
 
module.exports = current;