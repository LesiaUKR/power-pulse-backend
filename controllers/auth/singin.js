const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
const bcrypt = require('bcryptjs');
const Users = require("../../models/users");
const createError = require("../../helpers/createError");

const singin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
        const result = await bcrypt.compare(password, user.password);
    
        if (result)
            if (!user.token) {
                const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: '1d' });
                const updateUser = await Users.findByIdAndUpdate(user._id, { token });
                res.status(200);
                res.json({
                    message: "login success",
                    email,
                    token
                })
            } else {
                res.status(200);
                res.json({
                    token: user.token,
                    user: {
                        email: user.email,
                    
                    }
                })
            }
        else {
            next(createError('UNAUTHORIZED', 'Email or password is wrong'));
        }
    }else next(createError('UNAUTHORIZED', 'Email or password is wrong'));
}

module.exports = singin;