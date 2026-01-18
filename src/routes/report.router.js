const express = require("express");
const { getLawyerCases } = require("../controllers/report.controller");

const router = express.Router();

router.get("/lawyer/:lawyerId/cases", getLawyerCases);

module.exports = router;
