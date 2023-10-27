const { createError, calculateBMR } = require("../helpers");
const Users = require("../models/users");

const dailyMetrics = async (req, res, next) => {
    let updBodyParams;
    const { name, height, currentWeight, birthday, sex, levelActivity } = req.body;
    const dci = Math.floor(calculateBMR(currentWeight, height, birthday, levelActivity, sex));
        if (name) {
            delete req.body.name;
            updBodyParams = {name, bodyParams: { ...req.body, dailyIntakeCalories: dci }}
    } else updBodyParams = { bodyParams: { ...req.body, dailyIntakeCalories: dci } }
    try {
        const user = await Users.findOne({ _id: req.user });
        const data = await Users.findByIdAndUpdate(req.user, { ...user, ...updBodyParams });  
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
module.exports = dailyMetrics;