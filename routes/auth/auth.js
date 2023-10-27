const express = require("express");
const current = require("../../controllers/current");
const singup = require("../../controllers/auth/singup");
const singin = require("../../controllers/auth/singin");
const logout = require("../../controllers/auth/logout");
const dailyMetrics = require("../../controllers/dailyMetrics");
const auth = require("../../middlewares/auth");
const validateSignUp = require("../../middlewares/validateSignUp");
const schemaRegister = require("../../middlewares/schemaRegister");
const validateSignIn = require("../../middlewares/validateSignIn");
const schemaLogin = require("../../middlewares/schemaLogin");
const validateBMR = require("../../middlewares/validateBMR");
const schemaBMR = require("../../middlewares/schemaBMR");
const userChangeData = require("../../controllers/userChangeData");
const uploadFile = require("../../middlewares/uploadFile");
// const googleAuth = require("../../controllers/auth/googleAuth");
const router = express.Router();

router.post("/users/register",validateSignUp(schemaRegister), singup);
router.post("/users/login",validateSignIn(schemaLogin), singin);
router.post("/users/logout", auth, logout);
router.get("/users",auth, current);
// router.get("/users/googleAuth", googleAuth);
// router.get("/users/googleAuth-redirect", googleAuthRedirect);

router.patch("/users/dailyMetrics",auth,validateBMR(schemaBMR) , dailyMetrics);
router.patch("/users/changeData", auth, uploadFile.single("avatar"), userChangeData);
module.exports = router;

