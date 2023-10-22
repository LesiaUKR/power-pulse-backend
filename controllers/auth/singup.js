const Users = require("../../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const createError = require("../../helpers/createError");
const { JWT_SECRET_KEY } = process.env;
const singup = async (req, res, next) => {
    const { email, password: pass } = req.body;
    const avatarUrl = gravatar.url(email);
    const password = await bcrypt.hash(pass, 10);
    console.log(password)
    try {
        const user = await Users.create({ ...req.body, avatarUrl });
        const {_id} = user;
        const token = jwt.sign({_id}, JWT_SECRET_KEY, { expiresIn: '1d' });
        const updateUser = await Users.findByIdAndUpdate(_id, {...req.body, password, token});
        res.status(201);
        res.json({
            message: "User created",
            token
        })
        
    } catch (err) {
        if (err.code === 11000){
            next(createError('CONFLICT','Email in use'))
        }
    }
    
    
    
}
module.exports = singup;