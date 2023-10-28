const dailyMetrics = require("../../controllers/dailyMetrics");
const auth = require("../../middlewares/auth");
const validateSignUp = require("../../middlewares/validateSignUp");
const schemaRegister = require("../../models/schemaRegister");
const validateSignIn = require("../../middlewares/validateSignIn");
const schemaLogin = require("../../models/schemaLogin");
const validateBMR = require("../../middlewares/validateBMR");
const schemaBMR = require("../../models/schemaBMR");
const userChangeData = require("../../controllers/userChangeData");
const uploadFile = require("../../middlewares/uploadFile");
const { singup, singin, logout, current } = require("../../controllers/auth/controllerAuth");

module.exports = {
    dailyMetrics,
    auth,
    validateSignUp,
    schemaRegister,
    validateSignIn,
    schemaLogin,
    validateBMR,
    schemaBMR,
    userChangeData,
    uploadFile,
    singup,
    singin,
    logout,
    current
}