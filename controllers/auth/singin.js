const Users = require("../../models/users");

const singin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email })
    console.log(user)
    next();
}

module.exports = singin;