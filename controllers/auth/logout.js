const createError = require("../../helpers/createError");
const Users = require("../../models/users");

const logout = async (req, res, next) => {
    try{
        const user = await Users.findByIdAndUpdate(req.user, {token: ''})
        if (!user) next(createError('UNAUTHORIZED', 'user dont logined'))
        else next(createError('NOCONTENT', 'No Content'));
    }catch(err){
        next(err);
    }
    
}

module.exports = logout;