const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const { getProductsByFilter } = require("../controllers/products");

router.get("/", auth, getProductsByFilter);

module.exports = router;
