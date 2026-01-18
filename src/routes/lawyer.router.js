const express = require("express");
const router = express.Router();
const {authorize, authenticate} = require("../middlewares/authMiddleware");
const lawyerController = require("../controllers/lawyer.controller");

router.post("/",  authenticate, authorize(["admin"]), lawyerController.createLawyer);
router.get("/",  authenticate,lawyerController.getAllLawyer);
router.get("/:id",  authenticate, lawyerController.getOneLawyer);

module.exports = router;