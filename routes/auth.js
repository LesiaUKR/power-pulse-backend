const express = require("express");
const {
  singup,
  singin,
  logout,
  current,
  dailyMetrics,
  userChangeData,
  validateSignUp,
  schemaRegister,
  validateSignIn,
  schemaLogin,
  auth,
  validateBMR,
  schemaBMR,
  uploadFile,
} = require("../controllers/auth");
const router = express.Router();

router.post("/register", validateSignUp(schemaRegister), singup);
router.post("/login", validateSignIn(schemaLogin), singin);
router.post("/logout", auth, logout);
router.get("/", auth, current);
// router.get("/users/googleAuth", googleAuth);
// router.get("/users/googleAuth-redirect", googleAuthRedirect);

router.patch("/dailyMetrics", auth, validateBMR(schemaBMR), dailyMetrics);
router.patch("/changeData", auth, uploadFile.single("avatar"), userChangeData);

module.exports = router;
