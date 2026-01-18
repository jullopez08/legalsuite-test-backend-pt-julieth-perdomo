const express = require("express");
const router = express.Router();
const legalCaseController = require("../controllers/legalCase.controller");

router.post("/", legalCaseController.createCase);
router.get("/", legalCaseController.getAllCases);
router.get("/:id", legalCaseController.getOneCase);
router.patch("/:id/assign", legalCaseController.assignLawyerToCase);
router.put("/:id/transfer", legalCaseController.transferCase);

module.exports = router;