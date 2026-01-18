const express = require("express");
const router = express.Router();
const {authorize, authenticate} = require("../middlewares/authMiddleware");
const legalCaseController = require("../controllers/legalCase.controller");
const { validateBody} = require("../middlewares/validateBody");
const {createCasesSchema} = require("../validators/legalCase.validator");

router.post(
    "/", 
    authenticate, 
    authorize(["admin"]), 
    validateBody(createCasesSchema),
    legalCaseController.createCase);
router.get("/", authenticate,legalCaseController.getAllCases);
router.get("/:id", authenticate,legalCaseController.getOneCase);
router.patch("/:id/assign", authenticate, authorize(["admin"]), legalCaseController.assignLawyerToCase);
router.put("/:id/transfer", authenticate, authorize(["admin"]), legalCaseController.transferCase);

module.exports = router;