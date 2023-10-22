const Users = require("../../models/users");

const singup = async (req, res, next) => {
    const user = await Users.create(req.body);
    console.log(user);
    next();
}

module.exports = singup;