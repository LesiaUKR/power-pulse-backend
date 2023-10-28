const express = require("express");
const ctrl = require("../controllers/statistics");
const router = express.Router();

router.get("/", ctrl.getStatistics);

module.exports = router;
