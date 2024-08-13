const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const adminController = require("../Controller/adminController");

router.get("/users", authMiddleware, adminController.getUsers);
router.post("/newuser", authMiddleware, adminController.newUser);
router.get("/user/:id", authMiddleware, adminController.getUserId);
router.put("/user/:id", authMiddleware, adminController.updateUser);
router.delete("/user/:id", authMiddleware, adminController.deleteUser);

module.exports = router;
