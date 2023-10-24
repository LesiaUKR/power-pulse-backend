const jwt = require("jsonwebtoken");
const createError = require("../helpers/createError");
const { JWT_SECRET_KEY } = process.env;
const auth = async (req, res, next) => {
    if (!req.headers.authorization) next(createError('UNAUTHORIZED', 'Empty token'))
    else {
        const [_, token] = req.headers.authorization.split(" ");
    
        try {
            const decoded = jwt.verify(token, JWT_SECRET_KEY);
            const { _id: id } = decoded;
            req.user = id;
        } catch (err) {
            next(createError('UNAUTHORIZED', err));
        }
    }
    next();
}

module.exports = auth;