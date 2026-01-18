const express = require("express");
const router = express.Router();
const {authorize, authenticate} = require("../middlewares/authMiddleware");
const lawyerController = require("../controllers/lawyer.controller");
const { validateBody} = require("../middlewares/validateBody");
const {createLawyerSchema} = require("../validators/lawyer.validator");

router.post(
    "/",
    authenticate, 
    authorize(["admin"]), 
    validateBody(createLawyerSchema),
    lawyerController.createLawyer);
router.get("/",  authenticate,lawyerController.getAllLawyer);
router.get("/:id",  authenticate, lawyerController.getOneLawyer);

module.exports = router;