const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/upload", authMiddleware, userController.uploadProfileImage);

module.exports = router;
