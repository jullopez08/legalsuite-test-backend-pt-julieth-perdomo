const express = require("express");
const router = express.Router();
const lawyerController = require("../controllers/lawyer.controller");

router.post("/", lawyerController.createLawyer);
router.get("/", lawyerController.getAllLawyer);
router.get("/:id", lawyerController.getOneLawyer);

module.exports = router;