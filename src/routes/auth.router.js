const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { validateBody } = require("../middlewares/validateBody");
const {createUserSchema} = require("../validators/user.validator");

router.post("/login", authController.loginUser);
router.post("/register", validateBody(createUserSchema),authController.create);

module.exports = router;