const express = require("express");
const { getLawyerCases } = require("../controllers/report.controller");
const { authenticate} = require("../middlewares/authMiddleware");


const router = express.Router();

router.get("/lawyer/:lawyerId/cases", authenticate, getLawyerCases);

module.exports = router;
